from django.contrib import admin
from . import models


@admin.register(models.Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'stage']
    list_per_page = 10


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title']
    search_fields = ['title']
    ordering = ['title']


@admin.register(models.Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'text']
    ordering = ['-created_at']
    list_per_page = 10