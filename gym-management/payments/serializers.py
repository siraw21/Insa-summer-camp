from rest_framework import serializers

from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    member_number = serializers.CharField(
        source="membership.member.member_number",
        read_only=True,
    )

    member_name = serializers.SerializerMethodField()

    plan_name = serializers.CharField(
        source="membership.plan.name",
        read_only=True,
    )

    class Meta:
        model = Payment

        fields = [
            "id",
            "membership",
            "member_number",
            "member_name",
            "plan_name",
            "amount",
            "payment_method",
            "payment_date",
            "reference_number",
            "notes",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "member_number",
            "member_name",
            "plan_name",
            "payment_date",
            "created_at",
            "updated_at",
        ]

    def get_member_name(self, obj):
        return (
            f"{obj.membership.member.first_name} "
            f"{obj.membership.member.last_name}"
        )