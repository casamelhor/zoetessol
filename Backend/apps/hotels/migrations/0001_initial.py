# Generated by Django 5.2.2 on 2025-06-11 11:59

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HotelBookingDetails',
            fields=[
                ('hotel_booking_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('location_city', models.CharField(max_length=100)),
                ('preferred_locality', models.CharField(blank=True, max_length=255, null=True)),
                ('preferred_hotel', models.CharField(blank=True, max_length=255, null=True)),
                ('room_type', models.CharField(max_length=100)),
                ('check_in_date', models.DateField()),
                ('check_out_date', models.DateField()),
                ('meal_plan', models.CharField(choices=[('EP', 'EP'), ('CP', 'CP'), ('MAP', 'MAP'), ('AP', 'AP')], max_length=4)),
                ('expected_rate_per_night', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('total_budget_limit', models.DecimalField(decimal_places=2, max_digits=12)),
                ('special_instructions', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('booking', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='hotel_details', to='bookings.booking')),
            ],
        ),
    ]
