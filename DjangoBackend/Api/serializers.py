from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password'] # password excluded from the output.

    def create(self, validated_data): # to hash password.
        user = User.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ReminderSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    task = TaskSerializer(read_only=True)
    class Meta:
        model = Reminder
        fields = '__all__'