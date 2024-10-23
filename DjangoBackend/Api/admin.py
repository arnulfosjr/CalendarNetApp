from django.contrib import admin
from .models import User,Event,Task,Reminder

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email','password']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title','startDate','endDate','color','descr']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title','dueDate','color','descr','timeCreated','updateTimeCreated','isCompleted']

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ['event','task','time','timeCreated','updateTimeCreated']

