from rest_framework import serializers

from .models import Membership, MembershipPlan


class MembershipPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipPlan
        fields = [
            "id",
            "name",
            "description",
            "duration_days",
            "price",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


class MembershipSerializer(serializers.ModelSerializer):
    member_number = serializers.CharField(
        source="member.member_number",
        read_only=True,
    )

    member_name = serializers.SerializerMethodField()

    plan_name = serializers.CharField(
        source="plan.name",
        read_only=True,
    )

    is_expired = serializers.BooleanField(
        read_only=True,
    )

    class Meta:
        model = Membership

        fields = [
            "id",
            "member",
            "member_number",
            "member_name",
            "plan",
            "plan_name",
            "start_date",
            "end_date",
            "status",
            "is_expired",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "member_number",
            "member_name",
            "plan_name",
            "is_expired",
            "status",
            "created_at",
            "updated_at",
        ]

    def get_member_name(self, obj):
        return (
            f"{obj.member.first_name} "
            f"{obj.member.last_name}"
        )