import uuid
from django.db import models
from apps.bookings.models import Booking

class TrainBookingDetails(models.Model):
    JOURNEY_CLASS_CHOICES = [
        ('Sleeper', 'Sleeper'),
        ('3rd Class', '3rd Class'),
        ('2nd Class', '2nd Class'),
        ('1st Class', '1st Class'),
    ]
    SEAT_PREFERENCE_CHOICES = [
        ('Lower', 'Lower'),
        ('Upper', 'Upper'),
        ('No Preference', 'No Preference'),
    ]

    train_booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='train_details')
    from_station = models.CharField(max_length=100)
    to_station = models.CharField(max_length=100)
    travel_date = models.DateField()
    journey_class = models.CharField(max_length=15, choices=JOURNEY_CLASS_CHOICES)
    preferred_departure_time = models.TimeField(blank=True, null=True)
    preferred_arrival_time = models.TimeField(blank=True, null=True)
    train_no_or_name = models.CharField(max_length=100, blank=True, null=True)
    seat_preference = models.CharField(max_length=50, choices=SEAT_PREFERENCE_CHOICES, blank=True, null=True)
    budget_limit = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.from_station} to {self.to_station} ({self.travel_date})"