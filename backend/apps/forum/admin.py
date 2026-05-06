from django.contrib import admin
from .models import ForumModel, ForumAnswerModel


admin.site.register([ForumModel,ForumAnswerModel])