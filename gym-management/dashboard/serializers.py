from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):
    total_members = serializers.IntegerField()
    active_members = serializers.IntegerField()
    expired_members = serializers.IntegerField()
    monthly_revenue = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    expiring_memberships = serializers.IntegerField()