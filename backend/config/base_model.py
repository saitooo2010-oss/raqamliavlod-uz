from django.db import models
import uuid


class BaseModel(models.Model):
    guid = models.UUIDField("Takrorlanmas ID", default=uuid.uuid4, unique=True, primary_key=True)
    
    created_at = models.DateTimeField("Yaratilingan sana", auto_now_add=True)
    updated_at = models.DateTimeField("Taxrirlangan sana", auto_now=True)
    
    class Meta:
        abstract = True
