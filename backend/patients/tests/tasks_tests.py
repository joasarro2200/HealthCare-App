from django.core import mail
from django.test import TestCase

from ..tasks import send_welcome_email


class SendEmailTaskTest(TestCase):
    def test_send_email_task(self):
        patient_name = "Dummy Gonzalez"
        patient_email = "dummy@gmail.com"
        send_welcome_email(patient_name, patient_email)
        self.assertEqual(len(mail.outbox), 1)
        email = mail.outbox[0]
        self.assertEqual(
            email.subject, "Patient registration confirmation"
        )
        self.assertEqual(email.to, [patient_email])
