from celery import shared_task
from django.core.mail import EmailMultiAlternatives

@shared_task
def send_welcome_email(patient_name, patient_email):
    subject = 'Bienvenido a nuestra aplicación'
    message = f'Hola {patient_name},\n\nGracias por registrarte en nuestra aplicación.'
    from_email = 'noreply@example.com'
    recipient_list = [patient_email]

    msg = EmailMultiAlternatives(subject, message, from_email, recipient_list)
    msg.send()