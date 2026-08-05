from datetime import timedelta
from decimal import Decimal

from django.db.models import Sum
from django.utils import timezone

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from members.models import Member
from memberships.models import Membership
from payments.models import Payment

from .serializers import DashboardSerializer


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        today = timezone.now().date()

        next_week = today + timedelta(days=7)

        total_members = Member.objects.count()

        active_members = Member.objects.filter(
            status="ACTIVE"
        ).count()

        expired_members = Member.objects.filter(
            status="EXPIRED"
        ).count()

        monthly_revenue = (
            Payment.objects.filter(
                payment_date__year=today.year,
                payment_date__month=today.month,
            ).aggregate(
                total=Sum("amount")
            )["total"]
            or Decimal("0.00")
        )

        expiring_memberships = Membership.objects.filter(
            end_date__gte=today,
            end_date__lte=next_week,
            status="ACTIVE",
        ).count()

        data = {
            "total_members": total_members,
            "active_members": active_members,
            "expired_members": expired_members,
            "monthly_revenue": monthly_revenue,
            "expiring_memberships": expiring_memberships,
        }

        serializer = DashboardSerializer(data)

        return Response(serializer.data)