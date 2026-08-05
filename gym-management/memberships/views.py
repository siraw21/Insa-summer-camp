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