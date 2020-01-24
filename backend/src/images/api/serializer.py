from rest_framework import serializers
from images.models import Image


class ImageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id',
                  'title',
                  'src',
                  'width',
                  'height']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id',
                  'title',
                  'src',
                  'width',
                  'height',
                  'author_name',
                  'source_date',
                  'source_link',
                  'comment',
                  'created_at']
