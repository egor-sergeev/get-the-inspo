from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from images.models import Image
from .serializer import ImageSerializer, ImageListSerializer


class ImageListView(ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageListSerializer


class ImageDetailedView(RetrieveAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ImageCreateView(ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
