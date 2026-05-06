from rest_framework.generics import ListAPIView, CreateAPIView
from .models import ForumModel, ForumAnswerModel
from .serializers import ForumSerializer, ForumAnswerSerializer


class FormApiView(ListAPIView):
	queryset = ForumModel.objects.all()
	serializer_class = ForumSerializer


class FormAnswerApiView(ListAPIView):
	serializer_class = ForumAnswerSerializer

	def get_queryset(self):
		article_guid = self.kwargs['guid']
		return ForumAnswerModel.objects.filter(article__guid=article_guid)


class FormAnswerCreateApiView(CreateAPIView):
	serializer_class = ForumAnswerSerializer