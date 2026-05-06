from django.contrib import admin
from django.utils.html import format_html
from .models import NewsModel

# Register your models here.


class NewsAdmin(admin.ModelAdmin):
    list_display = ("display_thumbnail", "title", "source", "created_at",)
    prepopulated_fields = {"slug": ("title",)}
    list_display_links = ("display_thumbnail", "title",)
    
    def display_thumbnail(self, obj):
        if not obj.thumbnail:
            return "—"
        return format_html(
            '<img src="{}" alt="{}" style="height: 120px" />',
            obj.thumbnail.url,
            obj.title
        )
    display_thumbnail.short_description = "Rasm"
    def get_thumbnail(self, obj):
        if obj.thumbnail:  # ← bo'sh emasligini tekshirish
            return format_html('<img src="{}" height="50"/>', obj.thumbnail.url)
        return "—"
    get_thumbnail.short_description = "Rasm"

admin.site.register(NewsModel, admin_class=NewsAdmin)
