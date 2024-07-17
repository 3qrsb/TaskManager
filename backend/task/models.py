from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['title']


class Task(models.Model):
    IN_PROGRESS = 'in_progress'
    COMPLETED = 'completed'

    STAGE_CHOICES = [
        (IN_PROGRESS, 'In Progress'),
        (COMPLETED, 'Completed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default=IN_PROGRESS)
    category = models.ForeignKey(Category, null=True, on_delete=models.PROTECT, related_name='tasks')
    start_time = models.DateTimeField()
    due_to = models.DateTimeField()

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['-stage']

