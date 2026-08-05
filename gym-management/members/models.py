import uuid

from django.db import models


class Member(models.Model):

    class Gender(models.TextChoices):
        MALE = "MALE", "Male"
        FEMALE = "FEMALE", "Female"
        OTHER = "OTHER", "Other"

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    member_number = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
    )

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    profile_image = models.ImageField(
        upload_to="members/profile_images/",
        blank=True,
        null=True,
    )

    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
    )

    date_of_birth = models.DateField(
        blank=True,
        null=True,
    )

    phone = models.CharField(max_length=20)
    email = models.EmailField(
        blank=True,
        null=True,
    )

    address = models.TextField(
        blank=True,
    )

    emergency_contact_name = models.CharField(
        max_length=100,
        blank=True,
    )

    emergency_contact_phone = models.CharField(
        max_length=20,
        blank=True,
    )

    emergency_contact_relationship = models.CharField(
        max_length=50,
        blank=True,
    )

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    joined_at = models.DateTimeField(
        auto_now_add=True,
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

    def save(self, *args, **kwargs):
        if not self.member_number:
            last_member = (
                Member.objects
                .order_by("-member_number")
                .first()
            )

            if last_member:
                number = int(
                    last_member.member_number.split("-")[1]
                ) + 1
            else:
                number = 1

            self.member_number = f"GYM-{number:05d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member_number} - {self.first_name} {self.last_name}"