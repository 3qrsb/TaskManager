from django.db import models
from django.conf import settings


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
    IN_PROGRESS = 'in_progress'
    COMPLETED = 'completed'

    LOW = 1
    MEDIUM = 2
    HIGH = 3

    STAGE_CHOICES = [
        (IN_PROGRESS, 'In Progress'),
        (COMPLETED, 'Completed'),
    ]

    PRIORITY_CHOICES = [
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default=IN_PROGRESS)
    #why default is medium? task can also be without a priority
    priority = models.IntegerField(choices=PRIORITY_CHOICES, null=True, blank=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.PROTECT, related_name='tasks')
    created_at = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateField(null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)

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
