from django.urls import path
from .views import ImageListView, ImageDetailedView, ImageCreateView, log_write_view

urlpatterns = [
    path('images/', ImageListView.as_view()),
    path('images/create/', ImageCreateView.as_view()),
    path('images/<pk>', ImageDetailedView.as_view()),
    path('log/', log_write_view)
]
