from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from django.db import transaction
from datetime import datetime
import pytz

import logging
logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['email','password','token']

    def create(self, validated_data): # create user and to hash password.
        try:
            logger.info("User Creation endpoint hit")
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
                logger.info("User ID: %d, Token Created: %s", user.id, token.key)
                logger.info('User Email: %s',user.email)
                user.token = token.key
                return user
        except Exception as e:
            logger.error(f"Error creating user: {str(e)}")
            raise ValidationError(f"Error creating user: {str(e)}")

class EventSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id','user','title','startDate','endDate','color','descr','date','repeat','endOfRepeat']

    def get_date(self, obj):
        return obj.date

    def create(self, validated_data):
        # gives the authenticated user making the request, to associate the event with the user.
        user = self.context['request'].user 
        start_date = validated_data['startDate']
        end_date = validated_data['endDate']
        end_Of_Repeat = validated_data.get('endOfRepeat')

        # convert user local time zone to UTC
        if start_date.tzinfo is None or end_date.tzinfo is None:
            raise serializers.ValidationError("startDate and endDate must be timezone aware")
        
        start_dateUTC = start_date.astimezone(pytz.UTC) # conversion to UTC.
        end_dateUTC = end_date.astimezone(pytz.UTC) # conversion to UTC.
        end_Of_RepeatUTC = end_Of_Repeat.astimezone(pytz.UTC) if end_Of_Repeat and end_Of_Repeat.tzinfo else None # conversion to UTC.

        event = Event.objects.create(
            user=user,
            title=validated_data['title'],
            descr=validated_data['descr'],
            startDate=start_dateUTC,
            endDate=end_dateUTC,
            color=validated_data['color'],
            repeat=validated_data['repeat'],
            endOfRepeat=end_Of_RepeatUTC,
        )

        if not event.id:
            raise serializers.ValidationError("Failed to create event: Event ID not set.")
        return event

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','user','title','dueDate','color','descr','timeCreated','updateTimeCreated','isCompleted']

class ReminderSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), required=False)
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), required=False)
    class Meta:
        model = Reminder
        fields = '__all__'

    def create(self,validated_data):
        user = self.context['request'].user # authenticated user
        event_data = validated_data.get('event')
        task_data = validated_data.get('task')

        if event_data:
            event = Event.objects.get(id=event_data['id'])
            if event.user != user:
                raise ValidationError('Cannot make a reminder for an event that is not the user.')
            
        if task_data:
            task = Task.objects.get(id=task_data['id'])
            if task.user != user:
                raise ValidationError('Cannot make a task for an event that is not the user.')
        
        return super().create(validated_data)