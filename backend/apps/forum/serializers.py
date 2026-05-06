from rest_framework.serializers import ModelSerializer
from .models import ForumModel, ForumAnswerModel


class ForumSerializer(ModelSerializer):
	class Meta:
		model = ForumModel
		fields = ['guid', 'user', 'title', 'slug', 'text']


class ForumAnswerSerializer(ModelSerializer):
	class Meta:
		model = ForumAnswerModel
		fields = ['guid', 'user', 'forum', 'text']