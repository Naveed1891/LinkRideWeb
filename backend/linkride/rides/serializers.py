from rest_framework import serializers
from .models import Ride, RideParticipant
from django.contrib.auth.models import User

class RideSerializer(serializers.ModelSerializer):
    driver = serializers.ReadOnlyField(source='driver.username')

    class Meta:
        model = Ride
        fields = '__all__'

class RideParticipantSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = RideParticipant
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
