import re
from django.core.exceptions import ValidationError


def validate_name(value):
    pattern = r"^[A-Za-z ]+$"
    if not re.match(pattern, value):
        raise ValidationError("Enter a valid name (only letters)")

def validate_is_digit(value):
    if not value.isdigit():
        raise ValidationError(
            "Enter a valid number",
            params={"value": value},
        )
