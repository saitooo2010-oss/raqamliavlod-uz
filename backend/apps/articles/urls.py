from django.urls import path
from .views import ArticleCategoryApiViews, ArticleApiView, ArticleCommentsApiView, ArticlerateCreate
app_name = 'articles'

urlpatterns = [
    path('article-categories/',ArticleCategoryApiViews.as_view()),
    path('articles/',ArticleApiView.as_view()),
    path('articles/<uuid:guid>/comments/', ArticleCommentsApiView.as_view()),
    path('rate_up/',ArticlerateCreate.as_view())
]
