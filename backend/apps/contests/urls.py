from django.urls import path

from .views import (
    ContestApiView,
    TaskApiView,
    TaskDetailApiView,
    UserContestRelationApiView,
    UserJoinContestApiView,
)

app_name = "contest"

urlpatterns = [
    path("user", UserContestRelationApiView.as_view()),
    path("user/join/<uuid:guid>", UserJoinContestApiView.as_view()),
    path("contests", ContestApiView.as_view()),
    path("tasks/<uuid:guid>", TaskApiView.as_view()),
    path("task/<uuid:guid>", TaskDetailApiView.as_view()),
]
