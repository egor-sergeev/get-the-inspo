from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from images.models import Image
from .serializer import ImageSerializer, ImageListSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, Http404
import json
import requests


class ImageListView(ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageListSerializer


class ImageDetailedView(RetrieveAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ImageCreateView(ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

# Better not use csrf_exempt in production server
@csrf_exempt
def log_write_view(request):
    if request.method == 'POST':
        # fields = requests.post('http://127.0.0.1:8124', 'describe logs.user_actions').text.split('\n')
        # fields = list(map(lambda s: s.split('\t')[0], fields))[:-1]

        data = json.loads(request.body.decode('utf-8'))

        query = 'INSERT INTO logs.user_actions VALUES ({})'.format(str(data.values())[13:-2])

        try:
            response = requests.post('http://127.0.0.1:8124', query)
        except requests.exceptions.Timeout:
            # Maybe set up for a retry, or continue in a retry loop
            return HttpResponse(status=408)
        except requests.exceptions.TooManyRedirects:
            # Resolve URL
            return HttpResponse(status=404)
        except requests.exceptions.RequestException as e:
            return Http404
        finally:
            return HttpResponse(status=response.status_code, content=response.content)
    else:
        return Http404
