from rest_framework import viewsets, mixins
from .models import Patient
from .serializers import PatientSerializer

class PatientViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
