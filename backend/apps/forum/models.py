from django.db import models
from apps.accounts.models import UserModel
from config.base_model import BaseModel


class ForumModel(BaseModel):
    user = models.ForeignKey(UserModel,related_name="user_form",on_delete=models.SET_NULL,null=True,blank=True)
    title = models.CharField(max_length=50)
    slug = models.SlugField("Meta", max_length=512, unique=True)
    text = models.TextField()

    class Meta:
        db_table = "forum"
        verbose_name = 'Forum'
        verbose_name_plural = 'Forumlar'


class ForumAnswerModel(BaseModel):
    user = models.ForeignKey(UserModel,related_name="user_forumanswer",on_delete=models.SET_NULL,null=True,blank=True)
    forum = models.ForeignKey(ForumModel,related_name="forum_forum",on_delete=models.CASCADE)
    text = models.TextField()

