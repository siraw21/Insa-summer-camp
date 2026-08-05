from django.contrib import admin

from .models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = (
        "member_number",
        "first_name",
        "last_name",
        "phone",
        "status",
        "joined_at",
    )

    list_filter = (
        "status",
        "gender",
    )

    search_fields = (
        "member_number",
        "first_name",
        "last_name",
        "phone",
        "email",
    )