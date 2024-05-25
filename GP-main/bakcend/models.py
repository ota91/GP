from django.db import models
from django.conf import settings
from datetime import date

# transaction model linked woth databse
class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    category = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField(default=date.today)

    def __str__(self):
        return f"{self.category} - {self.amount}"
