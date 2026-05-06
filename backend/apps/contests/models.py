from django.db import models
from config.base_model import BaseModel
from apps.accounts.models import UserModel


class LevelChoices(models.IntegerChoices):
    easy = (1, "Oson")
    medium = (2, "O'rtacha")
    hard = (3, "Qiyin")
    expert = (4, "Juda qiyin")

class TaskStatusChoices(models.IntegerChoices):
    easy = (1, "Pending")
    medium = (2, "Succses")
    hard = (3, "Failed")
    expert = (4, "Running")


class ContestModel(BaseModel):
    title = models.CharField("Sarlavha", max_length=256)
    slug = models.SlugField("Meta", max_length=512, unique=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    short_description = models.TextField("Kontest haqida qisqacha", max_length=255)
    description = models.TextField("Kontest haqida", max_length=16000)
    thumbnail = models.ImageField(upload_to='images/contest')
    is_listed = models.BooleanField(default=False)

    class Meta:
        db_table = "contests"
        verbose_name = 'Contest'
        verbose_name_plural = 'Contestlar'


class UserContestRelationModel(BaseModel):
    user = models.ForeignKey(UserModel,related_name="user_contestrelation",on_delete=models.CASCADE)
    contest = models.ForeignKey(ContestModel,related_name="contest_relations",on_delete=models.CASCADE)
    score = models.BigIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    disqualified_at = models.DateTimeField()



class TaskModel(BaseModel):
    author = models.ForeignKey(UserModel, related_name="user_tasks",on_delete=models.SET_NULL,null=True,blank=True)
    contest = models.ForeignKey(ContestModel, related_name="contest_tasks",on_delete=models.SET_NULL,null=True,blank=True)

    title = models.CharField("Sarlavha", max_length=256)
    slug = models.SlugField("Meta", max_length=512, unique=True)
    short_description = models.TextField("Masala haqida qisqacha", max_length=256)
    description = models.TextField("Masala haqida", max_length=16000)

    level = models.PositiveSmallIntegerField(choices=LevelChoices.choices, default=1)
    score = models.PositiveSmallIntegerField(default=5)

    is_published = models.BooleanField(default=False)


class UserTaskRelationModel(BaseModel):
    user = models.ForeignKey(UserModel,related_name="user_tasksrelation",on_delete=models.CASCADE)
    task = models.ForeignKey(TaskModel,related_name="contest_relations",on_delete=models.CASCADE)
    status = models.PositiveSmallIntegerField(choices=TaskStatusChoices.choices, default=1)


class TaskDataModel(BaseModel):
    task = models.OneToOneField(TaskModel, on_delete=models.CASCADE, related_name='task_data')

    memory = models.PositiveBigIntegerField()
    timeout = models.PositiveBigIntegerField()

    output = models.TextField()
    input = models.TextField()
    
    class Meta:
        db_table = "task_datas"
        verbose_name = 'Masala malumoti'
        verbose_name_plural = 'Masala'


class TaskTestModel(BaseModel):
    input = models.FileField(upload_to='test/inputs')
    output = models.FileField(upload_to='test/outputs')
    task = models.ForeignKey(TaskModel, on_delete=models.CASCADE, related_name='task_test')
    is_visible = models.BooleanField(default=False)
