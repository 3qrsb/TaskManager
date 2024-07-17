from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from datetime import datetime

@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        query_set = Task.objects.all()
        serializer = TaskSerializer(query_set, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.validated_data)
    

@api_view(['GET', 'PUT'])
def task_detail(request, id):
    task = Task.objects.get(pk=id)
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
