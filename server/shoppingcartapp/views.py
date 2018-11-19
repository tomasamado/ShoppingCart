from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Product
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from shoppingcartapp.serializers import UserSerializer, ProductSerializer
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
    # def get_queryset(self):
    #     user = self.request.user
    #     return Product.objects.filter(user_id = user)
    def create(self, request, *args, **kwargs):
        nv = Product(user_id = self.request.user)
        serializer = self.serializer_class(nv, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

