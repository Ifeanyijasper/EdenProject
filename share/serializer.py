from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','fullname','email','is_client','is_superuser','is_worker','phone','friend','served','my_bonus','refer_bonus','location','password')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.HyperlinkedModelSerializer): 
    class Meta:
        model = User
        fields = ('id','username','email','is_client','is_worker','phone','friend','password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user   

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('id','name','price','discount','description','img')


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id','name','price','discount','description','img')

class PurchasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchases
        fields = ('id','client_id','worker_id','client','worker','item','date','total','point')

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('id','img')

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id','client_name','testimonial','date')

class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ('id','status','client_id','client','bonus','date','amount')

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)