from django.urls import path
from .views import FormApiView, FormAnswerApiView, FormAnswerCreateApiView
app_name = 'forum'

urlpatterns = [
	path('forum/',FormApiView.as_view()),
	path('forum/<uuid:guid>/answers/',FormAnswerApiView.as_view()),
	path('forum-answer-create/',FormAnswerCreateApiView.as_view())
]