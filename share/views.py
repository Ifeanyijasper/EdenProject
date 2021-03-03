from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import RegisterSerializer, UserSerializer, ProductsSerializer, ServicesSerializer,TestimonialSerializer,PurchasesSerializer
from .models import *
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import generics

class RegisterViewSet(viewsets.ModelViewSet):
    """ 
    API enddpoint that allows users to be viewed or edited. 
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self, request, *args, **kwargs):
        user = User.objects.all()
        if 'username' in request.query_params:
            user=user.filter(username=request.query_params['username'])
        serializer = RegisterSerializer(user, many=True)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

class ProductsViewSet(viewsets.ModelViewSet):
    """ 
    API enddpoint that allows users to be viewed or edited. 
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        product = Products.objects.all()
        serializer = ProductsSerializer(product, many=True)
        return Response(serializer.data)


class ServicesViewSet(viewsets.ModelViewSet):
    """ 
    API enddpoint that allows users to be viewed or edited. 
    """
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        service = Services.objects.all()
        serializer = ServicesSerializer(service, many=True)
        return Response(serializer.data)

class PurchasesViewSet(viewsets.ModelViewSet):
    """ 
    API enddpoint that allows users to be viewed or edited. 
    """
    queryset = Purchases.objects.all()
    serializer_class = PurchasesSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        purchase = Purchases.objects.all()
        serializer = PurchasesSerializer(purchase, many=True)
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ModelViewSet):
    """ 
    API enddpoint that allows users to be viewed or edited. 
    """
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        testimonial = Testimonial.objects.all()
        serializer = TestimonialSerializer(testimonial, many=True)
        return Response(serializer.data)