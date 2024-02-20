from django.db import models
from django.core.validators import  FileExtensionValidator

from .validators import validate_name

class Patient(models.Model):
    name = models.CharField(max_length=255, validators=[validate_name])
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255, blank=True)
    document_photo = models.ImageField(
        upload_to='patient_documents/',
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg"]),
        ],
    )

    def __str__(self):
        return self.name
