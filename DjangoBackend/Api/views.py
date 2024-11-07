from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


class UserCreate(APIView):
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLogIn(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request,email=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key},status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
class UserEdit(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request,pk):
        user = get_object_or_404(User,pk=pk)
        serializers = UserSerializer(user, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAccountView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,pk):
        user = get_object_or_404(User,pk=pk)
        serializers = UserSerializer(user)
        return Response(serializers.data)

class UserDelete(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,pk):
        user = get_object_or_404(User,pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        serializers = EventSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class EventEdit(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request,pk):
        event = get_object_or_404(Event,pk=pk)
        serializers = EventSerializer(event, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDelete(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,pk):
        event = get_object_or_404(Event,pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,pk):
        event = get_object_or_404(Event,pk=pk)
        serializers = EventSerializer(event)
        return Response(serializers.data)

class TaskCreate(APIView):
     permission_classes = [IsAuthenticated]
     def post(self,request):
        serializers = TaskSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class TaskEdit(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request,pk):
        task = get_object_or_404(Task,pk=pk)
        serializers = TaskSerializer(task, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDelete(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,pk):
        task = get_object_or_404(Task,pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,pk):
        task = get_object_or_404(Task,pk=pk)
        serializers = TaskSerializer(task)
        return Response(serializers.data)

class ReminderCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        serializers = ReminderSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class ReminderEdit(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request,pk):
        reminder = get_object_or_404(Reminder,pk=pk)
        serializers = ReminderSerializer(reminder, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
