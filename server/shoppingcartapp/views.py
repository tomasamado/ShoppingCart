from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Product, Comment
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from shoppingcartapp.serializers import UserSerializer, ProductSerializer, CommentSerializerRead, CommentSerializerWrite
from rest_framework.response import Response
from rest_framework import status



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Product.objects.all().order_by('-created')
    serializer_class = ProductSerializer
    pagination_class: None

    def get_paginated_response(self, data):
        return Response(data)

    def create(self, request, *args, **kwargs):
        nv = Product(user_id = self.request.user)
        serializer = self.serializer_class(nv, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentByProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Comment.objects.all().order_by('-created')
    serializer_class = CommentSerializerRead
    pagination_class: None

    def get_paginated_response(self, data):
        return Response(data)

    def get_queryset(self):

        product = self.request.query_params.get('product_id')
        return Comment.objects.filter(product_id = product)

    def create(self, request, *args, **kwargs):
        nv = Comment(user_id = self.request.user)
        serializer = CommentSerializerWrite(nv, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Comment.objects.all().order_by('-created')
    serializer_class = CommentSerializerRead
    pagination_class: None

    def get_paginated_response(self, data):
        return Response(data)


    def create(self, request, *args, **kwargs):
        nv = Comment(user_id = self.request.user)
        serializer = CommentSerializerWrite(nv, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class ReplyViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = Comment.objects.all().order_by('-created')
#     serializer_class = CommentSerializerWrite
#     pagination_class: None

#     def get_paginated_response(self, data):
#         return Response(data)

#     def get_queryset(self):

#         comment = self.request.query_params.get('parent_id')
#         return Comment.objects.filter(parent_id = comment)          

class OwnProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Product.objects.all().order_by('-created')
    serializer_class = ProductSerializer
    pagination_class: None

    def get_paginated_response(self, data):
        return Response(data)
    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(user_id = user)
    def create(self, request, *args, **kwargs):
        nv = Product(user_id = self.request.user)
        serializer = self.serializer_class(nv, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ProfilePictureViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = ProfilePicture.objects.all().order_by('user_id')
#     serializer_class = ProfilePictureSerializer
#     pagination_class: None

#     def get_paginated_response(self, data):
#         return Response(data)

#     def create(self, request, *args, **kwargs):
#         nv = ProfilePicture(user_id = self.request.user)
#         serializer = self.serializer_class(nv, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
