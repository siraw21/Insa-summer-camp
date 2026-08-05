from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models

from memberships.models import Membership


class Payment(models.Model):

    class PaymentMethod(models.TextChoices):
        CASH = "CASH", "Cash"
        TELEBIRR = "TELEBIRR", "Telebirr"
        CBE_BIRR = "CBE_BIRR", "CBE Birr"
        BANK_TRANSFER = "BANK_TRANSFER", "Bank Transfer"

    membership = models.ForeignKey(
        Membership,
        on_delete=models.PROTECT,
        related_name="payments",
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(Decimal("0.01"))
        ],
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
    )

    payment_date = models.DateTimeField(
        auto_now_add=True,
    )

    reference_number = models.CharField(
        max_length=100,
        blank=True,
    )

    notes = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return (
            f"{self.membership.member.member_number} - "
            f"{self.amount}"
        )