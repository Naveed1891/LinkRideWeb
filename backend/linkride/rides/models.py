from django.db import models
from django.contrib.auth.models import User

class Ride(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    fare = models.DecimalField(max_digits=6, decimal_places=2)
    seats_available = models.IntegerField()

    def __str__(self):
        return f"{self.origin} to {self.destination} on {self.date} at {self.time}"

class RideParticipant(models.Model):
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    checked_in = models.BooleanField(default=False)
    checked_out = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} in ride {self.ride.id}"