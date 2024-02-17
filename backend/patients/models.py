from django.db import models

class Patient(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    document_photo = models.ImageField(upload_to='patient_documents/')
