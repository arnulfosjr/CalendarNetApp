from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def set_password(self, raw_password): # password hashing.
        self.password = make_password(raw_password)
        self.save()
    
    def check_password(self,raw_password): # check hashed password.
        return check_password(raw_password,self.password)

class Event(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE,related_name='events',null=True,blank=True)
    title = models.CharField(max_length=20)
    startDate = models.DateField()
    endDate = models.DateField()
    color = models.CharField()
    descr = models.CharField(max_length=200)

class Task(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE,related_name='tasks',null=True,blank=True)
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

    def clean(self):
        if not self.event and not self.task:
            raise ValidationError("Reminder must have either an event or a task.")
        if self.event and self.task:
            raise ValidationError("Reminder must choose either event or task, not both.")
        
    def save(self, *args, **kwargs):
        # class clean method before saving.
        self.clean()
        super(Reminder, self).save(*args,**kwargs)

    
