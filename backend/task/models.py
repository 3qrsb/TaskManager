from django.db import models

class Task(models.Model):
    IN_PROGRESS = 'in_progress'
    COMPLETED = 'completed'

    STAGE_CHOICES = [
        (IN_PROGRESS, 'In Progress'),
        (COMPLETED, 'Completed'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default=IN_PROGRESS)
    start_time = models.DateTimeField()
    due_to = models.DateTimeField()