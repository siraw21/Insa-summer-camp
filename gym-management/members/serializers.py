from rest_framework import serializers

from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "id",
            "member_number",
            "first_name",
            "last_name",
            "profile_image",
            "gender",
            "date_of_birth",
            "phone",
            "email",
            "address",
            "emergency_contact_name",
            "emergency_contact_phone",
            "emergency_contact_relationship",
            "status",
            "joined_at",
            "notes",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "member_number",
            "joined_at",
            "created_at",
            "updated_at",
        ]