from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.filters import OrderingFilter, SearchFilter
from .pagination import CustomPageNumberPagination
from .models import Task, Category, Note
from .serializers import TaskSerializer, AddTaskSerializer, UpdateStageSerializer, CategorySerilizer, NoteSerializer


class TaskViewSet(ModelViewSet):
    pagination_class = CustomPageNumberPagination
    filter_backends = [OrderingFilter, SearchFilter]
    ordering_fields = ['stage', 'created_at', 'title']
    search_fields = ['title', 'description']

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
        elif self.request.method == 'PATCH':
            return UpdateStageSerializer
        return TaskSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerilizer
    

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'text']
    ordering_fields = ['created_at', 'title']
    ordering = ['created_at']
