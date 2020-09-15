from django.urls import path
from .views import *

urlpatterns = [
    path('', TaskView.as_view(), name='task_list.url'),
    path('<str:id>/complete/', TaskComplete.as_view(), name='task_list.url'),
    path('<str:id>/delete/', TaskDelete.as_view(), name='task_list.url'),
]
