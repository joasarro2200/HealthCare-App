import random

import factory
from django.core.files.base import ContentFile

from .models import Patient


class PatientFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Patient

    name = factory.Faker("name")
    email = factory.Faker("email")
    address = factory.Faker("address")
    phone_number = factory.LazyAttribute(
        lambda _: str(random.randrange(10000000000, 90000000000))
    )
    document_photo = factory.LazyAttribute(
        lambda _: ContentFile(
            factory.django.ImageField()._make_data({"width": 200, "height": 200}),
            "document.jpg",
        )
    )
