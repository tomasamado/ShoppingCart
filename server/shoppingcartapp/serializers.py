from django.contrib.auth.models import User
from rest_framework import serializers
from shoppingcartapp.models import Product, Comment
from drf_extra_fields.fields import Base64ImageField
from django.db import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        extra_kwargs = {'password': {'write_only': True}}
        password = serializers.CharField(allow_blank=True, max_length=100, required=False)

        fields = ('id', 'username','password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
        
    def patch(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance



class CommentSerializer(serializers.ModelSerializer):


    class Meta:
        model = Comment
        # parent_id = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
        fields = ('id', 'content','user_id','product_id','parent_id')
        # depth = 1
        
class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ('id', 'image','title','description','price','quantity','created','user_id')
        # depth = 1

# class ProfilePictureSerializer(serializers.ModelSerializer):


#     class Meta:
#         model = ProfilePicture
#         fields = ('user_id', 'image')

