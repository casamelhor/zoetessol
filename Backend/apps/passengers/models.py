import uuid
from django.db import models
from django.core.validators import RegexValidator, EmailValidator
from apps.common.models import TimeStampedModel
from apps.bookings.models import Booking
from apps.common.choices import GENDER_CHOICES, EMPLOYEE_GRADE_CHOICES

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class Passenger(TimeStampedModel):
    passenger_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="passengers")
    full_name = models.CharField(max_length=255)
    contact_number = models.CharField(
        max_length=20,
        validators=[RegexValidator(regex=r'^\+?\d{10,15}$', message="Enter a valid contact number (10-15 digits, optional +)")]
    )
    email_id = models.EmailField(validators=[EmailValidator()])
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    employee_id = models.CharField(max_length=100, blank=True, null=True)
    employee_grade = models.CharField(max_length=2, choices=EMPLOYEE_GRADE_CHOICES)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.full_name} ({self.email_id})"