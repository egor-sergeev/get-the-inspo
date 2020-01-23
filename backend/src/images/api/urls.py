from django.urls import path
from .views import ImageListView, ImageDetailedView

urlpatterns = [
    path('images/', ImageListView.as_view()),
    path('images/<pk>', ImageDetailedView.as_view())
]
