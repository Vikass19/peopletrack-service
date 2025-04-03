from ..models import UserProfiles
from rest_framework import serializers



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfiles
        fields = '__all__'
