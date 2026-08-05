from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    MembershipPlanViewSet,
    MembershipViewSet,
)


router = DefaultRouter()

router.register(
    "plans",
    MembershipPlanViewSet,
    basename="membership-plan",
)

router.register(
    "",
    MembershipViewSet,
    basename="membership",
)


urlpatterns = [
    path("", include(router.urls)),
]