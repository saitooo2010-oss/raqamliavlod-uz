from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import NewsModel


class BreakingNewsSerializer(ModelSerializer):
    class Meta:
        model = NewsModel
        fields = ['guid', 'thumbnail', 'title', 'slug', 'source', 'created_at']


class CreateNewsSerializer(ModelSerializer):
    thumbnail = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = NewsModel
        fields = ['title', 'slug', 'source', 'thumbnail']

    def create(self, validated_data):
        # thumbnail yo'q bo'lsa default None
        validated_data.setdefault('thumbnail', None)
        return super().create(validated_data)
