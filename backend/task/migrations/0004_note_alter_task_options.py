# Generated by Django 4.2.7 on 2024-07-26 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0003_remove_task_due_to_remove_task_start_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ['-stage', 'id']},
        ),
    ]
