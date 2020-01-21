from django.db import models
from versatileimagefield.fields import VersatileImageField
from datetime import datetime


class Image(models.Model):
    title = models.CharField(max_length=200)

    file = VersatileImageField(
        'Image',
        upload_to='resources/images/',
    )

    author_name = models.CharField(max_length=100)
    source_date = models.DateField(default=datetime.now)
    source_link = models.URLField()

    comment = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
