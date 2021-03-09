from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import generics, status

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
        Purchase = Purchases.objects.all()
        serializer = PurchasesSerializer(Purchase, many=True)
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

class CheckoutViewSet(viewsets.ModelViewSet):
    """ 
    API enddpoint that allows users to be viewed or edited. 
    """
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        checkout = Checkout.objects.all()
        serializer = CheckoutSerializer(checkout, many=True)
        return Response(serializer.data)

class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)