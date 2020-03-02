from django.db import models
from versatileimagefield.fields import VersatileImageField
import uuid


class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=200)

    width = models.PositiveIntegerField('Image Width', null=True, blank=True)
    height = models.PositiveIntegerField('Image Height', null=True, blank=True)

    src = VersatileImageField(
        'Image',
        upload_to='images/',
        width_field='width',
        height_field='height'
    )

    author_name = models.CharField(max_length=100, null=True, blank=True)
    source_date = models.DateField(null=True, blank=True)
    source_link = models.URLField(null=True, blank=True)

    comment = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
