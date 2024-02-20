import os
import tempfile

from django.test import TestCase
from django.test.utils import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from unittest.mock import patch

from ..models import Patient


IMG_PATH_JPEG = "./media/cedula.jpeg"
IMG_PATH_JPG = "./media/cedula.jpg"


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class PatientViewSetCreateTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("patients-list")
        self.data = {
            "name": "Martin Sarro",
            "email": "martin@gmail.com",
            "address": "Sancho Panza 4421",
            "phone_number": "1234567890",
            "document_photo": "",
        }
        self.absolute_path = os.path.abspath(os.path.dirname(__file__))
        self.file_path = os.path.join(self.absolute_path, IMG_PATH_JPG)

    def test_create_patient_valid_data(self):
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            with open(self.file_path, "rb") as infile:
                self.data["document_photo"] = infile
                response = self.client.post(self.url, self.data, format="multipart")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

            mock_task.assert_called_once_with(self.data["name"], self.data["email"])

            self.assertEqual(Patient.objects.count(), 1)
            patient = Patient.objects.first()
            self.assertEqual(patient.name, self.data["name"])
            self.assertEqual(patient.email, self.data["email"])
            self.assertEqual(patient.address, self.data["address"])
            self.assertEqual(patient.phone_number, self.data["phone_number"])
            self.assertIsNotNone(patient.document_photo)

    def test_create_patient_invalid_name(self):
        self.data["name"] = "Jo4quin S4rro"
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            with open(self.file_path, "rb") as infile:
                self.data["document_photo"] = infile
                response = self.client.post(self.url, self.data, format="multipart")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(
                response.json(), {"name": ["Enter a valid name (only letters)"]}
            )
            self.assertEqual(Patient.objects.count(), 0)
            self.assertEqual(mock_task.call_count, 0)

    def test_create_patient_invalid_email(self):
        self.data["email"] = "martinyahoo.com"
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            with open(self.file_path, "rb") as infile:
                self.data["document_photo"] = infile
                response = self.client.post(self.url, self.data, format="multipart")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(response.json(), {"email": ["Enter a valid email address."]})
            self.assertEqual(Patient.objects.count(), 0)
            self.assertEqual(mock_task.call_count, 0)

    def test_create_patient_invalid_phone_number(self):
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            self.data["phone_number"] = "a946673211"
            with open(self.file_path, "rb") as infile:
                self.data["document_photo"] = infile
                response = self.client.post(self.url, self.data, format="multipart")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(response.json(), {"phone_number": ["Enter a valid number"]})
            self.assertEqual(Patient.objects.count(), 0)
            self.assertEqual(mock_task.call_count, 0)

    def test_create_patient_invalid_empty_photo(self):
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            response = self.client.post(self.url, self.data, format="multipart")
            
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(
                response.json(),
                {
                    "document_photo": [
                        "The submitted data was not a file. "
                        "Check the encoding type on the form."
                    ]
                },
            )
            self.assertEqual(Patient.objects.count(), 0)
            self.assertEqual(mock_task.call_count, 0)

    def test_create_patient_invalid_jpeg_photo(self):
        file_path = os.path.join(self.absolute_path, IMG_PATH_JPEG)
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            with open(file_path, "rb") as infile:
                self.data["document_photo"] = infile
                response = self.client.post(self.url, self.data, format="multipart")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(
                response.json(),
                {
                    "document_photo": [
                        "File extension “jpeg” is not allowed. Allowed extensions are: jpg."
                    ]
                },
            )
            self.assertEqual(Patient.objects.count(), 0)
            self.assertEqual(mock_task.call_count, 0)

    def test_create_patient_empty_fields(self):
        with patch("patients.tasks.send_welcome_email.delay") as mock_task:
            response = self.client.post(self.url, {}, format="json")

            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(
                response.json(),
                {
                    "name": ["This field is required."],
                    "email": ["This field is required."],
                    "phone_number": ["This field is required."],
                    "document_photo": ["No file was submitted."],
                },
            )
            self.assertEqual(Patient.objects.count(), 0)
            self.assertEqual(mock_task.call_count, 0)
