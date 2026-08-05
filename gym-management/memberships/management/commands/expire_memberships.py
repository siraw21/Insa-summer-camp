from django.core.management.base import BaseCommand
from django.utils import timezone

from memberships.models import Membership


class Command(BaseCommand):
    help = "Expire memberships whose end date has passed."

    def handle(self, *args, **options):
        today = timezone.localdate()

        updated_count = Membership.objects.filter(
            status=Membership.Status.ACTIVE,
            end_date__lt=today,
        ).update(
            status=Membership.Status.EXPIRED,
            updated_at=timezone.now(),
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"{updated_count} membership(s) expired."
            )
        )