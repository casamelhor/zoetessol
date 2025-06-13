from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainBookingDetailsViewSet

router = DefaultRouter()
router.register(r'train-bookings', TrainBookingDetailsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]