from rest_framework import serializers
from .models import User, Event, Task, Reminder

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '_all_'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '_all_'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '_all_'

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = '_all_'