from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

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

    def __str__(self):
        return self.name

class Services(models.Model):
    name        = models.CharField(max_length = 200, null=True)
    price       = models.DecimalField(max_digits=7, decimal_places=2)
    discount    = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.CharField(max_length = 500)
    
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
