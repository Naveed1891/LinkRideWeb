from django.db import models
from django.conf import settings

class Ride(models.Model):
    driver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='rides_posted'
    )
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    time = models.DateTimeField()
    seats_available = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    passengers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='rides_joined',
        blank=True
    )

    def __str__(self):
        return f"{self.source} to {self.destination} by {self.driver.username}"

    def remaining_seats(self):
        return self.seats_available - self.passengers.count()