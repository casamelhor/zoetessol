from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HotelBookingDetailsViewSet

router = DefaultRouter()
router.register(r'hotel-bookings', HotelBookingDetailsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]