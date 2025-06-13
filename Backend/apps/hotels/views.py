from rest_framework import viewsets
from .models import HotelBookingDetails
from .serializers import HotelBookingDetailsSerializer

class HotelBookingDetailsViewSet(viewsets.ModelViewSet):
    queryset = HotelBookingDetails.objects.all()
    serializer_class = HotelBookingDetailsSerializer