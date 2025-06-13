from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FlightBookingDetailsViewSet

router = DefaultRouter()
router.register(r'flight-bookings', FlightBookingDetailsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]