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
    created_at = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateField(default='2024-07-31')

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['-stage', 'id']


class Note(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']