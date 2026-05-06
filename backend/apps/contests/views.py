from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContestModel, TaskModel, UserContestRelationModel
from .serializers import (
    ContestSerializer,
    TaskDetailserializers,
    Taskserializers,
    UserContestRelationSerializer,
)


class ContestApiView(ListAPIView):
    def get_queryset(self):
        objects = ContestModel.objects
        if self.request.GET.get("is_top", "f") == "t":
            return objects.filter(is_listed=True)
        return objects.all()

    serializer_class = ContestSerializer


class TaskApiView(ListAPIView):
    def get_queryset(self):
        contest_guid = self.kwargs["guid"]
        if contest_guid == "56f02a21-1ab3-4dd4-8ef9-c212be1e5b14":
            return TaskModel.objects.filter(is_published=True)
        return TaskModel.objects.filter(contest__guid=contest_guid)

    serializer_class = Taskserializers


class UserRetingApiView(ListAPIView):
    pass


class UserContestRelationApiView(ListCreateAPIView):
    serializer_class = UserContestRelationSerializer
    queryset = UserContestRelationModel.objects.all()


class UserJoinContestApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, guid):
        user = request.user
        contest = get_object_or_404(ContestModel, guid=guid)

        return Response({"user": user.guid, "contest": contest.guid})


class TaskDetailApiView(RetrieveAPIView):
    queryset = TaskModel.objects.all()
    serializer_class = TaskDetailserializers
    lookup_field = "guid"
    lookup_url_kwarg = "guid"


class CheckCodeApiView:
    pass
