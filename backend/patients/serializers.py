from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = Patient
        fields = ['id', 'name', 'email', 'phone_number', 'document_photo']
