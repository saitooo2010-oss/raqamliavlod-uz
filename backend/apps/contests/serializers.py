from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import (
    ContestModel,
    TaskDataModel,
    TaskModel,
    TaskTestModel,
    UserContestRelationModel,
)


class ContestSerializer(ModelSerializer):
    subscribers = SerializerMethodField()

    def get_subscribers(self, obj):
        return obj.contest_relations.count()

    class Meta:
        model = ContestModel
        fields = [
            "guid",
            "title",
            "slug",
            "start_time",
            "end_time",
            "short_description",
            "thumbnail",
            "subscribers",
            "is_listed",
        ]


class Taskserializers(ModelSerializer):
    class Meta:
        model = TaskModel
        fields = ["guid", "contest", "title", "slug", "short_description"]


class UserContestRelationSerializer(ModelSerializer):
    class Meta:
        model = UserContestRelationModel
        fields = ["guid", "user", "contest", "score", "is_active", "disqualified_at"]


class UserRetingSerializer(ModelSerializer):
    class Meta:
        model = UserContestRelationModel
        fields = []


class TaskTestSerializer(ModelSerializer):
    input_text = SerializerMethodField()
    output_text = SerializerMethodField()

    class Meta:
        model = TaskTestModel
        fields = ["guid", "input_text", "output_text"]

    def get_input_text(self, obj):
        try:
            with open(obj.input.path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception:
            return ""

    def get_output_text(self, obj):
        try:
            with open(obj.output.path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception:
            return ""


class TaskDataSerializer(ModelSerializer):
    class Meta:
        model = TaskDataModel
        fields = ["guid", "memory", "timeout", "input", "output"]


class TaskDetailserializers(ModelSerializer):
    taskdata = TaskDataSerializer(source="task_data", read_only=True)
    tests = SerializerMethodField()

    class Meta:
        model = TaskModel
        fields = [
            "guid",
            "contest",
            "author",
            "title",
            "slug",
            "short_description",
            "description",
            "level",
            "is_published",
            "taskdata",
            "tests",
        ]

    def get_tests(self, obj):
        queryset = obj.task_test.filter(is_visible=True)
        return TaskTestSerializer(queryset, many=True).data
