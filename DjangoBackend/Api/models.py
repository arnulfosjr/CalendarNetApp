from django.db import models
from django.core.exceptions import ValidationError
#from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from rest_framework.authtoken.models import Token as DefaultToken


class UserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_superuser # superuser gets all permissions.
    
    def has_module_perms(self,app_lable):
        return self.is_superuser # superuser can access all modules.

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

    
