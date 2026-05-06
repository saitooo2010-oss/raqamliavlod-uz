from django.db import models
from config.base_model import BaseModel


class NewsModel(BaseModel):
    thumbnail = models.ImageField("Rasm", upload_to='news/', null=True, blank=True)
    title = models.CharField("Sarlavha", max_length=256)
    slug = models.SlugField("Meta", max_length=512, unique=True)
    source = models.CharField("Silka (Resurs)", max_length=512)

    class Meta:
        db_table = "news"
        verbose_name = 'Yangilik'
        verbose_name_plural = 'Yangiliklar'
