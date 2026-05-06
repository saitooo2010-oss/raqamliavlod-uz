from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CourseModel, UserCourseRelationModel
from .serializers import NewCoursesSerializer, RecommendedCoursesSerializer, UserCourseRelationSerializer



class NewCoursesApiView(APIView):
    def get(self, request):
        queryset = CourseModel.objects.filter(is_new=True)
        serializer = NewCoursesSerializer(queryset, many=True)
        return Response(serializer.data)


class RecomendedCoursesApiView(APIView):
    def get(self, request):
        queryset = CourseModel.objects.filter(is_recommended=True)[:6]
        serializer = RecommendedCoursesSerializer(queryset, many=True)
        return Response(serializer.data)


class UserCourseRelationApiView(ListCreateAPIView):
    serializer_class = UserCourseRelationSerializer

    def get_queryset(self):
        user_guid = self.kwargs['guid']
        return UserCourseRelationModel.objects.filter(user__guid=user_guid)

