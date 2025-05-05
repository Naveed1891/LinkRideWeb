from django.db import models
from django.contrib.auth.models import User

class Ride(models.Model):
    driver_name = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.driver_name}: {self.source} to {self.destination}"

class RideParticipant(models.Model):
    ride = models.ForeignKey(Ride, related_name='participants', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} joined {self.ride}"
