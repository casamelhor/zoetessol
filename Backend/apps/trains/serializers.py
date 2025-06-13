from rest_framework import serializers
from .models import TrainBookingDetails

class TrainBookingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainBookingDetails
        fields = [
            'train_booking_id',
            'booking',
            'from_station',
            'to_station',
            'travel_date',
            'journey_class',
            'preferred_departure_time',
            'preferred_arrival_time',
            'train_no_or_name',
            'seat_preference',
            'budget_limit',
            'created_at',
            'updated_at',
        ]