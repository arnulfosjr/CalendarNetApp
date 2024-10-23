from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=12)

class Event(models.Model):
    title = models.CharField(max_length=20)
    startDate = models.DateField()
    endDate = models.DateField()
    color = models.CharField()
    descr = models.CharField(max_length=200)

class Task(models.Model):
    title = models.CharField(max_length=20)
    dueDate = models.DateField()
    color = models.CharField()
    descr = models.CharField(max_length=200)
    timeCreated = models.DateTimeField(auto_now_add=True)
    updateTimeCreated = models.DateTimeField(auto_now=True)
    isCompleted = models.BooleanField(default=False)

class Reminder(models.Model):
    event = models.ForeignKey('Event',on_delete=models.CASCADE,related_name='reminders',null=True,blank=True)
    task = models.ForeignKey('Task',on_delete=models.CASCADE,related_name='reminders',null=True,blank=True)
    time = models.DateTimeField()
    timeCreated = models.DateTimeField(auto_now_add=True)
    updateTimeCreated = models.DateTimeField(auto_now=True)

    
