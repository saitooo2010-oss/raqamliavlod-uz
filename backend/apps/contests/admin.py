from django.contrib import admin
from django.utils.html import format_html
from .models import ContestModel, TaskModel, TaskDataModel, TaskTestModel


class ContestAdmin(admin.ModelAdmin):
    fields = ('title', 'slug', 'thumbnail', 'start_time', 'end_time', 'short_description', 'description', 'is_listed')
    list_display = ("display_thumbnail", "title", "created_at",)
    prepopulated_fields = {"slug": ("title",)}
    list_display_links = ("display_thumbnail", "title",)

    def display_thumbnail(self, obj: ContestModel):
        return format_html(f'<img src="{obj.thumbnail.url}" alt="{obj.title}" style="height: 120px" />')
    display_thumbnail.short_description = "Rasm"


admin.site.register(ContestModel, admin_class=ContestAdmin)
admin.site.register([TaskModel,TaskDataModel,TaskTestModel])