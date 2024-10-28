from django.urls import path
from .views import *

urlpatterns = [
    path('users/', UserCreate.as_view(),name='userCreate'),
    path('users/<int:pk>/',UserEdit.as_view(),name='userEdit'),
    path('users/account/<int:pk>/',UserAccountView.as_view(),name='userAccount'),
    path('users/delete/<int:pk>/',UserDelete.as_view(),name='userDelete'),
    path('event/',EventCreate.as_view(),name='eventCreate'),
    path('event/<int:pk>/',EventEdit.as_view(),name='eventEdit'),
    path('event/delete/<int:pk>/',EventDelete.as_view(),name='eventDelete'),
    path('event/<int:pk>/',EventView.as_view(),name='eventView'),
    path('task/',TaskCreate.as_view(),name='taskCreate'),
    path('task/<int:pk>/',TaskEdit.as_view(),name='taskEdit'),
    path('task/delete/<int:pk>/',TaskDelete.as_view(),name='taskDelete'),
    path('task/<int:pk>/',TaskView.as_view(),name='taskView'),
    path('reminder/',ReminderCreate.as_view(),name='reminderCreate'),
    path('reminder/<int:pk>/',ReminderEdit.as_view(),name='reminderEdit'),
]
