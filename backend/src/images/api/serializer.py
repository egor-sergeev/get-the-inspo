from rest_framework import serializers
from images.models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['title',
                  'file',
                  'author_name',
                  'source_date',
                  'source_link',
                  'comment',
                  'created_at']
