from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from django.db import transaction
import logging
logger = logging.getLogger('console')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['email','password','token']

    def create(self, validated_data): # create user and to hash password.
        try:
            with transaction.atomic():
                # create user and save in database.
                user = User.objects.create(
                    email=validated_data['email']
                )
                user.set_password(validated_data['password']) # hash password
                user.save()
                 # Check if user is really saved
                if not user.id:
                    raise ValidationError("User creation failed. User ID not set.")
        
                # token creation for user
                token, created = Token.objects.get_or_create(user=user)
                logger.debug("User ID: %d, Token Created: %s", user.id, token.key)
                user.token = token.key
                return user
        except Exception as e:
            logger.error(f"Error creating user: {str(e)}")
            raise ValidationError(f"Error creating user: {str(e)}")

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['user','title','startDate','endDate','color','descr','date']

        def create(self, validated_data,request):
            print("Received event data:",request.data)
            # gives the authenticated user making the request, to associate the event with the user.
            user = self.context['request'].user 
            event = Event.objects.create(
                user=user,
                **validated_data
            )
            return event

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ReminderSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=False)
    task = TaskSerializer(read_only=False)
    class Meta:
        model = Reminder
        fields = '__all__'

    def create(self,validated_data):
        user = self.context['request'].user # authenticated user
        event_data = validated_data.get('event')
        task_data = validated_data.get('task')

        if event_data:
            event = Event.objects.get(id=event_data.id)
            if event.user != user:
                raise ValidationError('Cannot make a reminder for an event that is not the user.')
            
        if task_data:
            task = Task.objects.get(id=task_data.id)
            if task.user != task:
                raise ValidationError('Cannot make a task for an event that is not the user.')
        
        return super().create(validated_data)