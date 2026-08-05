from decimal import Decimal
from datetime import date
from django.core.validators import MinValueValidator
from django.db import models

from members.models import Member


class MembershipPlan(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    duration_days = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.name} - {self.duration_days} days"


class Membership(models.Model):

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        EXPIRED = "EXPIRED", "Expired"
        CANCELLED = "CANCELLED", "Cancelled"

    member = models.ForeignKey(
        Member,
        on_delete=models.PROTECT,
        related_name="memberships",
    )

    plan = models.ForeignKey(
        MembershipPlan,
        on_delete=models.PROTECT,
        related_name="memberships",
    )

    start_date = models.DateField()

    end_date = models.DateField()

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    @property
    def is_expired(self):
        return self.end_date < date.today()

    def update_expiration_status(self):
      if (
          self.status == self.Status.ACTIVE
          and self.end_date < date.today()
      ):
          self.status = self.Status.EXPIRED
          self.save(update_fields=["status", "updated_at"])

    def __str__(self):
        return (
            f"{self.member.member_number} - "
            f"{self.plan.name}"
        )

    