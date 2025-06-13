import uuid
from django.db import models
from apps.bookings.models import Booking

class HotelBookingDetails(models.Model):
    MEAL_PLAN_CHOICES = [
        ('EP', 'EP'),   # European Plan
        ('CP', 'CP'),   # Continental Plan
        ('MAP', 'MAP'), # Modified American Plan
        ('AP', 'AP'),   # American Plan
    ]

    hotel_booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='hotel_details')
    location_city = models.CharField(max_length=100)
    preferred_locality = models.CharField(max_length=255, blank=True, null=True)
    preferred_hotel = models.CharField(max_length=255, blank=True, null=True)
    room_type = models.CharField(max_length=100)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    meal_plan = models.CharField(max_length=4, choices=MEAL_PLAN_CHOICES)
    expected_rate_per_night = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total_budget_limit = models.DecimalField(max_digits=12, decimal_places=2)
    special_instructions = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_nights(self):
        # Auto-calculated from check-in and check-out
        return (self.check_out_date - self.check_in_date).days

    def __str__(self):
        return f"{self.location_city} ({self.check_in_date} - {self.check_out_date})"