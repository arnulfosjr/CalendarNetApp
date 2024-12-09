from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

import logging
logger = logging.getLogger(__name__)

class UserCreate(APIView):
    def post(self,request, *args, **kwargs):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            try:
                user = serializers.save()
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'user': serializers.data,
                    'token': token.key
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error creating user views.py: {str(e)}")
                return Response({"detail": "Error creating user views.py"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLogIn(APIView):
    def post(self,request):
        logger.info("UserLogIn endpoint hit")
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error':'Invalid email or password'},status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password): # authenticated using the retrieved user and password.
            token, created = Token.objects.get_or_create(user=user)
            logger.info(f"Generated token: {token.key}")
            return Response({'token': token.key},status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
class UserLogOut(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        user = request.user
        try:
            token = Token.objects.get(user=user)
            logger.info(f"Logging out user {user.email}. Token: {token.key}")
            token.delete()
            return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            logger.warning(f"Logout attempted for user {user.email}, but no token found.")
            return Response({'message': 'No active session found to log out'}, status=status.HTTP_200_OK)
    
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
        serializers = EventSerializer(data=request.data, context={'request':request})
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
    
class EventList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(user=user)

class TaskCreate(APIView):
     permission_classes = [IsAuthenticated]
     def post(self,request):
        user = request.user
        event_data = request.data.copy()
        event_data['user'] = user.id
        serializers = TaskSerializer(data=event_data)
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
    
class TaskList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

class ReminderCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        reminder_data = request.data.copy()
        
        # if the event is provided and belongs to the user.
        if reminder_data.get('event'):
            try:
                event = Event.objects.get(id=reminder_data['event'])
                if event.user != user:
                    return Response({'error': 'Error: event does not belong to the user.'},status=status.HTTP_400_BAD_REQUEST)
            except Event.DoesNotExist:
                return Response({'error': 'Event does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        # if the task is provided and belongs to the user.
        if reminder_data.get('task'):
            try:
                task = Task.objects.get(id=reminder_data['task'])
                if task.user != user:
                    return Response({'error': 'Error: task does not belong to the user.'},status=status.HTTP_400_BAD_REQUEST)
            except Task.DoesNotExist:
                return Response({'error': 'Task does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
        serializers = ReminderSerializer(data=reminder_data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

class ReminderEdit(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request,pk):
        reminder = get_object_or_404(Reminder,pk=pk)
        serializers = ReminderSerializer(reminder,data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
