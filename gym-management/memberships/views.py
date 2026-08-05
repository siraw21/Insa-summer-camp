from datetime import timedelta

from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Membership, MembershipPlan
from .serializers import (
    MembershipPlanSerializer,
    MembershipSerializer,
)




class MembershipPlanViewSet(viewsets.ModelViewSet):
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer
    permission_classes = [IsAuthenticated]


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.select_related(
        "member",
        "plan",
    ).all()

    serializer_class = MembershipSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=True,
        methods=["post"],
        url_path="renew",
    )
    def renew(self, request, pk=None):
        membership = self.get_object()

        today = timezone.localdate()

        if membership.end_date >= today:
            base_date = membership.end_date + timedelta(days=1)
        else:
            base_date = today

        new_end_date = (
            base_date
            + timedelta(
                days=membership.plan.duration_days - 1
            )
        )

        new_membership = Membership.objects.create(
            member=membership.member,
            plan=membership.plan,
            start_date=base_date,
            end_date=new_end_date,
            status=Membership.Status.ACTIVE,
        )

        serializer = self.get_serializer(
            new_membership
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )