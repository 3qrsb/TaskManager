# Generated by Django 4.2.7 on 2024-07-22 21:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0002_category_rename_name_task_title_task_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='due_to',
        ),
        migrations.RemoveField(
            model_name='task',
            name='start_time',
        ),
        migrations.AddField(
            model_name='task',
            name='completion_date',
            field=models.DateField(default='2024-07-31'),
        ),
        migrations.AddField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
