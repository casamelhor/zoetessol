import uuid
from django.db import models
from apps.bookings.models import Booking

class FlightBookingDetails(models.Model):
    TRIP_TYPE_CHOICES = [
        ('One-way', 'One-way'),
        ('Two-way', 'Two-way'),
    ]
    MEAL_PREFERENCE_CHOICES = [
        ('Veg', 'Veg'),
        ('Non-Veg', 'Non-Veg'),
        ('Jain', 'Jain'),
        ('No Preference', 'No Preference'),
    ]

    flight_booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='flight_details')
    trip_type = models.CharField(max_length=10, choices=TRIP_TYPE_CHOICES)
    travel_from = models.CharField(max_length=100)
    airline_preference = models.CharField(max_length=100, blank=True, null=True)
    departure_date = models.DateField()
    return_date = models.DateField(blank=True, null=True)
    preferred_departure_time = models.TimeField(blank=True, null=True)
    preferred_return_time = models.TimeField(blank=True, null=True)
    meal_preference = models.CharField(max_length=15, choices=MEAL_PREFERENCE_CHOICES)
    baggage_allowance_kg = models.PositiveIntegerField(blank=True, null=True)
    budget_limit = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.travel_from} ({self.departure_date}) - {self.trip_type}"