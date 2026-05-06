from django.contrib import admin
from .models import UserModel

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['get_full_name']


admin.site.register(UserModel, admin_class=UserAdmin)
