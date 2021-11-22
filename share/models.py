from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    fullname       = models.CharField(max_length=200, null=True)
    is_client      = models.BooleanField(default=False)
    is_worker      = models.BooleanField(default=False)
    phone          = models.CharField(max_length = 200) 
    friend         = models.ForeignKey("self",on_delete=models.SET_NULL, related_name="referral", null=True, blank=True)
    updated        = models.DateTimeField(auto_now_add=True)
    served         = models.IntegerField(null=True)
    my_bonus       = models.FloatField(null=True)
    refer_bonus    = models.IntegerField(null=True)
    location       = models.CharField(max_length = 500,null=True)

class Products(models.Model):
    name        = models.CharField(max_length =200, null=True)
    price       = models.DecimalField(max_digits=7, decimal_places=2)
    discount    = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.CharField(max_length = 500)
    img         = models.FileField(null=True, blank=True)

    def __str__(self):
        return self.name
    

class Services(models.Model):
    name        = models.CharField(max_length = 200, null=True)
    price       = models.DecimalField(max_digits=7, decimal_places=2)
    discount    = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.CharField(max_length = 500)
    img         = models.FileField(null=True, blank=True)
    
    def __str__(self):
        return self.name

  
class Purchases(models.Model):
    client_id   = models.IntegerField()
    worker_id   = models.IntegerField()
    client      = models.CharField(max_length = 200, null=True)
    worker      = models.CharField(max_length = 200, null=True)
    item        = models.JSONField(null=True,blank=True)
    date        = models.DateTimeField(auto_now_add=True)
    point       = models.FloatField()
    total       = models.FloatField()

    def __str__(self):
        return self.client

class Testimonial(models.Model):
    client_name     = models.CharField(max_length=150)
    testimonial     = models.CharField(max_length=500)
    date            = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.client_name

class Checkout(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Processed', 'Processed'),
    )
    status   = models.CharField(max_length=10, choices=STATUS_CHOICES)
    client_id= models.IntegerField()
    client   = models.CharField(max_length=150)
    bonus    = models.CharField(max_length=500)
    date     = models.DateTimeField(auto_now_add=True)
    amount   = models.FloatField()

    def __str__(self):
        return self.status

class Gallery(models.Model):
    name     = models.CharField(max_length=100)
    img      = models.FileField(null=True, blank=True)
    event    = models.CharField(max_length=150)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance,reset_password_token, *args, **kwargs):
    
    email = 'Hello!\n'
    email +='We received a request to reset the password for your account for this email address. \n' 
    email +='To initiate the password reset process for your account, click the link below.'+ "https://inspireafrica-edenbeauty.com{}confirm/?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key) + 'with token:{}'.format(reset_password_token.key) 
    email +='\nThis link and token can only be used once. If you need to reset your password again, please request another reset link. If you did not make this request, you can ignore this email.\n' 
    email +='Sincerely,\n'
    email +='The Eden Beauty Team\n' 
    

    send_mail(
        # title:
        "Password Reset from {title}".format(title="Edenbeauty Account"),
        # message:
        email,
        # from:
        settings.EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )
