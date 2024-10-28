from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import response

class UserCreate():
    pass

class UserEdit():
    pass

class UserAccountView(APIView):
    pass

class UserDelete():
    pass

class EventCreate():
    pass

class EventEdit():
    pass

class EventDelete():
    pass

class EventView(APIView):
    pass

class TaskCreate():
    pass

class TaskEdit():
    pass

class TaskDelete():
    pass

class TaskView(APIView):
    pass

class ReminderCreate():
    pass

class ReminderEdit():
    pass
