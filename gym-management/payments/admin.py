from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "membership",
        "amount",
        "payment_method",
        "payment_date",
    )

    list_filter = (
        "payment_method",
        "payment_date",
    )

    search_fields = (
        "membership__member__member_number",
        "membership__member__first_name",
        "membership__member__last_name",
        "reference_number",
    )