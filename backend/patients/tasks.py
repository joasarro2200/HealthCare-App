from celery import shared_task
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import send_mail


@shared_task
def send_welcome_email(patient_name, patient_email):
    subject = "Patient registration confirmation"
    html_content = render_to_string(
        "emails/register_email.html",
        {
            "name": patient_name,
        },
    )
    from_email = settings.EMAIL_DEFAULT_FROM
    recipient_list = [patient_email]

    send_mail(
        subject,
        None,
        from_email,
        recipient_list,
        html_message=html_content,
    )
