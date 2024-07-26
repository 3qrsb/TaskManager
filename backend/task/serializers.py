from rest_framework import serializers
from .models import Task, Category, Note

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'stage', 'category', 'created_at', 'completion_date']
    
    category = serializers.StringRelatedField()


class CategorySerilizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['title', 'text', 'created_at']