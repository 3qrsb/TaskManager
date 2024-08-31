from django.db import models
from django.conf import settings
from django.utils import timezone


class Customer(models.Model):
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.user.username}'
    

class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['title']


class Task(models.Model):
    class Stage(models.TextChoices):
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'completed', 'Completed'

    class Priority(models.IntegerChoices):
        LOW = 1, 'Low'
        MEDIUM = 2, 'Medium'
        HIGH = 3, 'High'

    title = models.CharField(max_length=255)
    description = models.TextField()
    stage = models.CharField(max_length=20, choices=Stage.choices, default=Stage.IN_PROGRESS)
    priority = models.IntegerField(choices=Priority.choices, null=True, blank=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.PROTECT, related_name='tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateField(null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='tasks')
    isFlagged = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['-priority', '-stage', 'id']


class Note(models.Model):
    title = models.CharField(max_length=255, blank=True, default="")
    text = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['-created_at']
