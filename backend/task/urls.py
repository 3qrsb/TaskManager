from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('tasks', views.TaskViewSet)
router.register('categories', views.CategoryViewSet)

urlpatterns = router.urls