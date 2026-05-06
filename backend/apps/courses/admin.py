from django.contrib import admin
from django.utils.html import format_html
from .models import CourseModel, LessonModel

# Register your models here.


class LessonInline(admin.StackedInline):
    model = LessonModel
    extra = 2
    fields = ('source', 'description',)


class CourseAdmin(admin.ModelAdmin):
    fields = ('title', 'thumbnail', 'slug', 'short_description', 'description', 'is_new', 'is_recommended')
    list_display = ("display_thumbnail", "title", "created_at",)
    prepopulated_fields = {"slug": ("title",)}
    list_display_links = ("display_thumbnail", "title",)
    inlines = [LessonInline]

    def display_thumbnail(self, obj: CourseModel):
        return format_html(f'<img src="{obj.thumbnail.url}" alt="{obj.title}" style="height: 120px" />')
    display_thumbnail.short_description = "Rasm"


class LessonAdmin(admin.ModelAdmin):
    fields = ('course', 'source', 'description',)
    list_display = ("course__title", "source")


admin.site.register(CourseModel, admin_class=CourseAdmin)
admin.site.register(LessonModel, admin_class=LessonAdmin)
