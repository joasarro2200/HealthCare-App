from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

from .models import Patient
from .serializers import PatientSerializer
from .tasks import send_welcome_email

class PatientViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        send_welcome_email.delay(instance.name, instance.email)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
