from rest_framework import viewsets
from .models import FlightBookingDetails
from .serializers import FlightBookingDetailsSerializer

class FlightBookingDetailsViewSet(viewsets.ModelViewSet):
    queryset = FlightBookingDetails.objects.all()
    serializer_class = FlightBookingDetailsSerializer