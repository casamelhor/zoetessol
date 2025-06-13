import uuid
from django.db import models
from apps.common.choices import BOOKING_TYPE_CHOICES, STATUS_CHOICES
from apps.common.models import TimeStampedModel

class Booking(models.Model):
    booking_type = models.CharField(max_length=10, choices=BOOKING_TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking_type = models.CharField(max_length=10, choices=BOOKING_TYPE_CHOICES)
    booking_date = models.DateField(auto_now_add=True)  # Defaults to current date
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)  # Set when created
    updated_at = models.DateTimeField(auto_now=True)      # Updated on every save

    def __str__(self):
        return f"{self.booking_type} Booking ({self.booking_id})"