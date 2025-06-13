from rest_framework import serializers
from .models import Passenger, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']

class PassengerSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), source='department', write_only=True
    )

    class Meta:
        model = Passenger
        fields = [
            'passenger_id', 'booking_id', 'full_name', 'contact_number', 'email_id',
            'date_of_birth', 'gender', 'employee_id', 'employee_grade',
            'department', 'department_id'
        ]