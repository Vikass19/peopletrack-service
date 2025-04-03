from django.shortcuts import render
from .models import UserProfiles
from .serializer.serializers import UserProfileSerializer
from rest_framework import viewsets


class USerProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfiles.objects.all()
    serializer_class = UserProfileSerializer





