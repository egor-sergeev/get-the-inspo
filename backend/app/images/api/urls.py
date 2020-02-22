from django.urls import path
from .views import ImageListView, ImageDetailedView, ImageCreateView

urlpatterns = [
    path('images/', ImageListView.as_view()),
    path('images/create/', ImageCreateView.as_view()),
    path('images/<pk>', ImageDetailedView.as_view())
]
