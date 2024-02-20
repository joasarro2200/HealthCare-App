import tempfile
from django.test import TestCase
from django.test.utils import override_settings
from django.urls import reverse
from rest_framework.test import APIClient

from ..factories import PatientFactory


def patients_json(patients):
    patients_list = []
    for patient in patients:
        patients_list.append(
            {
                "id": patient.id,
                "name": patient.name,
                "email": patient.email,
                "address": patient.address,
                "phone_number": patient.phone_number,
                "document_photo": f"http://testserver{patient.document_photo.url}",
            }
        )
    return patients_list


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
@override_settings(MEDILIST_PATIENTS_PAGE_SIZEA_ROOT=10)
class PatientViewSetListTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("patients-list")

    def test_list_no_patients(self):
        response = self.client.get(self.url)
        self.assertEqual(
            response.json(), {"count": 0, "next": None, "previous": None, "results": []}
        )

    def test_list_patients_unique_page(self):
        patient_1 = PatientFactory()
        patient_2 = PatientFactory()
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result["count"], 2)
        self.assertIsNone(result["next"])
        self.assertIsNone(result["previous"])
        self.assertEqual(result["results"], patients_json([patient_2, patient_1]))

    def test_list_patients_multiple_pages(self):
        patients_list = []
        for _ in range(5):
            PatientFactory()
        for _ in range(10):
            patients_list.append(PatientFactory())
        response = self.client.get(self.url)
        result = response.json()
        self.assertEqual(result["count"], 15)
        self.assertEqual(result["next"], "http://testserver/patients/?page=2")
        self.assertIsNone(result["previous"])
        self.assertEqual(
            (result["results"]).sort(key=lambda x: x["id"], reverse=True),
            (patients_json(patients_list)).sort(key=lambda x: x["id"], reverse=True),
        )

    def test_list_patients_multiple_pages_second_page(self):
        patients_list = []
        for _ in range(10):
            PatientFactory()
        for _ in range(10):
            patients_list.append(PatientFactory())
        for _ in range(10):
            PatientFactory()
        response = self.client.get(f"{self.url}?page=2")
        result = response.json()
        self.assertEqual(result["count"], 30)
        self.assertEqual(result["next"], "http://testserver/patients/?page=3")
        self.assertEqual(result["previous"], "http://testserver/patients/")
        self.assertEqual(
            (result["results"]).sort(key=lambda x: x["id"], reverse=True),
            (patients_json(patients_list)).sort(key=lambda x: x["id"], reverse=True),
        )
