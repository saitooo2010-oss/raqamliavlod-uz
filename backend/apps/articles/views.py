from rest_framework.generics import ListAPIView,CreateAPIView
from .models import ArticlesModel,ArticleCategoryModel,ArticleCommentModel
from .serializers import ArticleCategorySerializer,ArticleSerializer,ArticleCommentSerializer,ArticleRateSerializer


class ArticleCategoryApiViews(ListAPIView):
    queryset = ArticleCategoryModel.objects.all()
    serializer_class = ArticleCategorySerializer


class ArticleApiView(ListAPIView):
    queryset = ArticlesModel.objects.all()
    serializer_class = ArticleSerializer


class ArticleCommentsApiView(ListAPIView):
    serializer_class = ArticleCommentSerializer

    def get_queryset(self):
        article_guid = self.kwargs['guid']
        return ArticleCommentModel.objects.filter(article__guid=article_guid)


class ArticlerateCreate(CreateAPIView):
    serializer_class = ArticleRateSerializer
