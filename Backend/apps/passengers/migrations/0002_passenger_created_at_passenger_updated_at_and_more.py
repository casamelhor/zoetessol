# Generated by Django 5.2.2 on 2025-06-11 18:47

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0001_initial'),
        ('passengers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='passenger',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='passenger',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='booking',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='passengers', to='bookings.booking'),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='employee_grade',
            field=models.CharField(choices=[('L1', 'L1'), ('L2', 'L2'), ('L3', 'L3')], max_length=2),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=6),
        ),
    ]
