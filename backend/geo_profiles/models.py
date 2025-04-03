from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class UserProfiles(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=False, null=False)
    phone_number = models.IntegerField(blank=False, null=False)
    bio = models.TextField(blank=True, null=True)
    interest = models.TextField(blank=True, null=True)

    # Location fields
    address = models.CharField(max_length=255, null=False, blank=False)
    city = models.CharField(max_length=100, null=False, blank=False)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Fixing the conflicts with Django’s built-in auth system
    groups = models.ManyToManyField(Group, related_name="userprofiles_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="userprofiles_permissions", blank=True)

    def __str__(self):
        return self.username
