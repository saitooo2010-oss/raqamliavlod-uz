from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import ArticleCategoryModel, ArticleCommentModel, ArticleRateModel, ArticlesModel
from django.db.models import Avg


class ArticleCategorySerializer(ModelSerializer):
    class Meta:
        model = ArticleCategoryModel
        fields = ['guid', 'title', 'slug', 'created_at']


class ArticleSerializer(ModelSerializer):
    rate = SerializerMethodField(method_name='get_rate')

    def get_rate(self, obj):
        result = ArticleRateModel.objects.filter(article=obj).aggregate(Avg("rate"))
        return int(result["rate__avg"]) or 0
    class Meta:
        model = ArticlesModel
        fields = ['guid', 'title', 'slug', 'rate', 'image', 'summary', 'created_at']


class ArticleCommentSerializer(ModelSerializer):
    class Meta:
        model = ArticleCommentModel
        fields = ['guid', 'user', 'text', 'likes', 'dislikes', 'created_at']


class ArticleRateSerializer(ModelSerializer):
    class Meta:
        model = ArticleRateModel
        fields = ['user', 'article', 'rate']