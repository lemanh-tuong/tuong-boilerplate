from django.urls import path
from . import views

urlpatterns = [
  path('', views.Demo),
  path('api', views.Service)
]

