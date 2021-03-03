from django.contrib import admin
# from django.contrib.auth.models import User

# Register your models here.
from .models import *
admin.site.register(User)
admin.site.register(Products)
admin.site.register(Services)
admin.site.register(Purchases)
admin.site.register(Testimonial)