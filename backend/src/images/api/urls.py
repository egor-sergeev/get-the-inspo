from django.urls import path
from.views import ImageListView, ImageDetailedView

urlpatterns = [
    path('', ImageListView.as_view()),
    path('<pk>', ImageDetailedView.as_view())
]