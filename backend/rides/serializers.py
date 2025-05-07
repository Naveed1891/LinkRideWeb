from rest_framework import serializers
from .models import Ride
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class RideSerializer(serializers.ModelSerializer):
    driver = UserSummarySerializer(read_only=True)
    passengers = UserSummarySerializer(many=True, read_only=True)
    remaining_seats = serializers.SerializerMethodField()

    class Meta:
        model = Ride
        fields = [
            'id', 'driver', 'source', 'destination', 'time',
            'seats_available', 'remaining_seats', 'created_at', 'passengers'
        ]

    def get_remaining_seats(self, obj):
        return obj.remaining_seats()
