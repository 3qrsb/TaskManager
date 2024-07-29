from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.pagination import PageNumberPagination
from .models import Task, Category, Note
from .serializers import TaskSerializer, AddTaskSerializer, CategorySerilizer, NoteSerializer


class TaskViewSet(ModelViewSet):
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = Task.objects.select_related('category').all()
        category_id = self.request.query_params.get('category_id')
        completion_date = self.request.query_params.get('completion_date')
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        elif completion_date is not None:
            queryset = queryset.filter(completion_date=completion_date)
        return queryset
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddTaskSerializer
        return TaskSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerilizer
    

class NoteViewSet(CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin, GenericViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
