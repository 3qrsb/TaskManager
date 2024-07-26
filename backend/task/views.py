from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin
from .models import Task, Category, Note
from .serializers import TaskSerializer, CategorySerilizer, NoteSerializer


class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.select_related('category').all()
        category_id = self.request.query_params.get('category_id')
        completion_date = self.request.query_params.get('completion_date')
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        elif completion_date is not None:
            queryset = queryset.filter(completion_date=completion_date)
        return queryset


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerilizer
    

class NoteViewSet(CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin, GenericViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
