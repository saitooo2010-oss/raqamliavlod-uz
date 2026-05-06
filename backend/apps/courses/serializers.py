from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import CourseModel, UserCourseRelationModel
import random


class NewCoursesSerializer(ModelSerializer):
    class Meta:
        model = CourseModel
        fields = ['guid', 'thumbnail', 'title', 'slug', 'short_description', 'created_at']


class RecommendedCoursesSerializer(ModelSerializer):
    subscribers = SerializerMethodField(method_name='get_subscribers')
    
    def get_subscribers(self, obj):
        return obj.course_relations.count()

    class Meta:
        model = CourseModel
        fields = ['guid', 'thumbnail', 'title', 'slug', 'short_description', 'subscribers', 'created_at']


class UserCourseRelationSerializer(ModelSerializer):
    class Meta:
        model = UserCourseRelationModel
        fields = [
            'guid', 'user', 'course', 'current_lesson', 'is_course_over'
        ]