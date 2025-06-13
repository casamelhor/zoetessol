from rest_framework import viewsets
from .models import TrainBookingDetails
from .serializers import TrainBookingDetailsSerializer

class TrainBookingDetailsViewSet(viewsets.ModelViewSet):
    queryset = TrainBookingDetails.objects.all()
    serializer_class = TrainBookingDetailsSerializer