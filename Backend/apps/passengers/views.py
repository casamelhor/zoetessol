from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Passenger, Department
from .serializers import PassengerSerializer, DepartmentSerializer

class PassengerViewSet(viewsets.ModelViewSet):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer