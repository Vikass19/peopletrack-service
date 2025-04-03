from django.urls import path , include
from .views import *
from rest_framework.routers import DefaultRouter
from .views import USerProfileViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static



router = DefaultRouter()

router.register(r'profiles' , USerProfileViewSet)



urlpatterns = [

   path('api/' , include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
