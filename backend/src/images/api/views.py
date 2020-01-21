from rest_framework.generics import ListAPIView, RetrieveAPIView
from images.models import Image
from .serializer import ImageSerializer


class ImageListView(ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ImageDetailedView(RetrieveAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
