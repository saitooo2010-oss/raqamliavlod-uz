from django.db import models
from django.contrib.auth.models import AbstractUser
from config.base_model import BaseModel

# Create your models here.


class UserModel(AbstractUser, BaseModel):
    first_name = models.CharField("Ism", max_length=25)
    middle_name = models.CharField("Sharif", max_length=25, null=True, blank=True)
    last_name = models.CharField("Familiya", max_length=25, null=True, blank=True)

    region = models.SmallIntegerField(default=0)
    district = models.SmallIntegerField(default=0)

    phone = models.CharField(max_length=13, unique=True)
    telegram = models.CharField(max_length=255, null=True, blank=True)
    school = models.CharField(max_length=128, null=True, blank=True)

    class Meta:
        db_table = "users"
        verbose_name = 'Foydalanuvchi'
        verbose_name_plural = 'Foydalanuvchilar'
