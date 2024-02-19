from django.conf import settings
from rest_framework.pagination import PageNumberPagination


class PatientsPagination(PageNumberPagination):
    page_size = settings.LIST_PATIENTS_PAGE_SIZE
