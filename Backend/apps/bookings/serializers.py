from rest_framework import serializers
from .models import Booking
from apps.passengers.serializers import PassengerSerializer
from apps.hotels.serializers import HotelBookingDetailsSerializer
# Add imports for FlightBookingSerializer, TrainBookingSerializer as needed

class BookingSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True, required=False)
    hotelBooking = HotelBookingDetailsSerializer(required=False)
    # Add flightBooking and trainBooking if needed

    class Meta:
        model = Booking
        fields = [
            "booking_id", "booking_type", "status", "booking_date",
            "created_at", "updated_at",
            "hotelBooking", "passengers"
            # Add "flightBooking", "trainBooking" if needed
        ]

    def create(self, validated_data):
        passengers_data = validated_data.pop("passengers", [])
        hotel_data = validated_data.pop("hotelBooking", None)
        # Add flight_data, train_data if needed

        booking = Booking.objects.create(**validated_data)

        # Create hotel details if present
        if hotel_data:
            from apps.hotels.models import HotelBooking
            HotelBooking.objects.create(booking=booking, **hotel_data)

        # Create passengers if present
        from apps.passengers.models import Passenger
        for passenger_data in passengers_data:
            Passenger.objects.create(booking=booking, **passenger_data)

        return booking