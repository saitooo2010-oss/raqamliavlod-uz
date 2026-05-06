from django.urls import path
from .views import BreakingNewsApiView, CreateNewsFromBotView

app_name = 'news'

urlpatterns = [
    path('breaking-news', BreakingNewsApiView.as_view(), name='breaking-news'),
    path('create-from-bot', CreateNewsFromBotView.as_view(), name='create-from-bot'),
]
