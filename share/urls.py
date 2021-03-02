from django.urls import path
from . import views

router.register('register', views.RegisterViewSet)
router.register('product', views.ProductsViewSet)
router.register('service', views.ServicesViewSet)
router.register('purchase', views.PurchasesViewSet)
app_name = 'share'
urlpatterns = [
    path('', views.index, name='index'),
    # path('', include(router.urls)),

]