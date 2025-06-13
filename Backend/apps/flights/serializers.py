from rest_framework import serializers
from .models import FlightBookingDetails

class FlightBookingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightBookingDetails
        fields = [
            'flight_booking_id',
            'booking',
            'trip_type',
            'travel_from',
            'airline_preference',
            'departure_date',
            'return_date',
            'preferred_departure_time',
            'preferred_return_time',
            'meal_preference',
            'baggage_allowance_kg',
            'budget_limit',
            'created_at',
            'updated_at',
        ]