from rest_framework import serializers
from .models import HotelBookingDetails

class HotelBookingDetailsSerializer(serializers.ModelSerializer):
    total_nights = serializers.ReadOnlyField()

    class Meta:
        model = HotelBookingDetails
        exclude = ['booking']  # Exclude booking from nested creation