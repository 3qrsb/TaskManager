from rest_framework import serializers
from .models import Task, Category, Note
from datetime import date

class TaskSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'stage', 'category', 'created_at', 'completion_date']


class AddTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'category', 'completion_date']

    def validate_completion_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("The completion date cannot be in the past.")
        return value


class UpdateStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['stage']


class CategorySerilizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['title', 'text', 'created_at']