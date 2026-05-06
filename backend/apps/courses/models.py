from django.db import models
from config.base_model import BaseModel
from apps.accounts.models import UserModel



class CourseModel(BaseModel):
    thumbnail = models.ImageField("Rasm", upload_to='news/')
    title = models.CharField("Sarlavha", max_length=256)
    slug = models.SlugField("Meta", max_length=512, unique=True)
    short_description = models.TextField("Kurs haqida qisqacha", max_length=256, null=True, blank=True)
    description = models.TextField("Kurs haqida", max_length=16000, null=True, blank=True)
    is_new = models.BooleanField(default=False)
    is_recommended = models.BooleanField(default=False)
    
    class Meta:
        db_table = "courses"
        verbose_name = 'Kurs'
        verbose_name_plural = 'Kurslar'


class LessonModel(BaseModel):
    course = models.ForeignKey(CourseModel, on_delete=models.CASCADE, related_name='course_lessons')
    source = models.CharField("YouTube embeded link", max_length=64, unique=True)
    description = models.TextField("Darslik haqida", max_length=16000, null=True, blank=True)

    class Meta:
        db_table = "lessons"
        verbose_name = 'Darslik'
        verbose_name_plural = 'Darsliklar'


class UserCourseRelationModel(BaseModel):
    user = models.ForeignKey(UserModel, related_name="user_courserelation", on_delete=models.CASCADE)
    course = models.ForeignKey(CourseModel, related_name="course_relations", on_delete=models.CASCADE)
    current_lesson = models.ForeignKey(LessonModel, related_name="current_lesson", on_delete=models.CASCADE)
    is_course_over = models.BooleanField(default=False)
