from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

class UserCreate(APIView):
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class UserEdit(APIView):
    def put(self,request,pk):
        user = get_object_or_404(User,pk=pk)
        serializers = UserSerializer(user, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAccountView(APIView):
    def get(self,request,pk):
        user = get_object_or_404(User,pk=pk)
        serializers = UserSerializer(user)
        return Response(serializers.data)

class UserDelete(APIView):
    def delete(self,request,pk):
        user = get_object_or_404(User,pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventCreate(APIView):
    def post(self,request):
        serializers = EventSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class EventEdit(APIView):
    def put(self,request,pk):
        event = get_object_or_404(Event,pk=pk)
        serializers = UserSerializer(event, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDelete(APIView):
    def delete(self,request,pk):
        event = get_object_or_404(Event,pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventView(APIView):
    def get(self,request,pk):
        event = get_object_or_404(Event,pk=pk)
        serializers = UserSerializer(event)
        return Response(serializers.data)

class TaskCreate(APIView):
     def post(self,request):
        serializers = TaskSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class TaskEdit(APIView):
    def put(self,request,pk):
        task = get_object_or_404(Task,pk=pk)
        serializers = UserSerializer(task, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDelete(APIView):
    def delete(self,request,pk):
        task = get_object_or_404(Task,pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskView(APIView):
    def get(self,request,pk):
        task = get_object_or_404(Task,pk=pk)
        serializers = UserSerializer(task)
        return Response(serializers.data)

class ReminderCreate(APIView):
    def post(self,request):
        serializers = ReminderSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class ReminderEdit(APIView):
    def put(self,request,pk):
        reminder = get_object_or_404(Reminder,pk=pk)
        serializers = UserSerializer(reminder, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
