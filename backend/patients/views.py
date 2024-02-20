import logging
import kombu.exceptions
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

from .models import Patient
from .serializers import PatientSerializer
from .tasks import send_welcome_email
from .pagination import PatientsPagination

logger = logging.getLogger("backend.patients")


class PatientViewSet(
    mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    queryset = Patient.objects.all().order_by("-id")
    serializer_class = PatientSerializer
    pagination_class = PatientsPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        logger.debug(f'Patient with name {request.data["name"]} created')
        try:
            send_welcome_email.delay(instance.name, instance.email)
        except kombu.exceptions.OperationalError:
            logger.info(
                f'Registration email for {request.data["name"]} could not be sent'
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
