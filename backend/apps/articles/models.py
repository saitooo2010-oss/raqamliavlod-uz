from django.db import models
from apps.accounts.models import UserModel
from config.base_model import BaseModel


class ArticleCategoryModel(BaseModel):
    title = models.CharField("Tur nomi", max_length=32)
    slug = models.SlugField("Meta", max_length=512, unique=True)

    class Meta:
        db_table = "article_category"
        verbose_name = 'Maqola turi'
        verbose_name_plural = 'Maqola turlari'

    def __str__(self):
        return self.title
class ArticlesModel(BaseModel):
    author = models.ForeignKey(UserModel, related_name="user_articles",on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(ArticleCategoryModel,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    slug = models.SlugField("Meta", max_length=512, unique=True)
    summary = models.TextField()
    image = models.ImageField(upload_to='images/articles')
    body = models.TextField()

    class Meta:
        db_table = "article"
        verbose_name = 'Maqola'
        verbose_name_plural = 'Maqolalar'


class ArticleRateModel(BaseModel):
    user = models.ForeignKey(UserModel,related_name="user_rated",on_delete=models.CASCADE)
    article = models.ForeignKey(ArticlesModel,related_name="article_rates",on_delete=models.CASCADE)
    rate = models.SmallIntegerField()


class ArticleCommentModel(BaseModel):
    user = models.ForeignKey(UserModel,related_name="user_comment",on_delete=models.CASCADE)
    article = models.ForeignKey(ArticlesModel,related_name="article_comments",on_delete=models.CASCADE)
    likes = models.PositiveBigIntegerField(default=0)
    dislikes = models.PositiveBigIntegerField(default=0)
    text = models.TextField()


