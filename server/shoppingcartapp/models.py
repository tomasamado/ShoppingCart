from django.db import models
from decimal import Decimal
from django.contrib.auth.models import User

# Create your models here.


class Product(models.Model):
    
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    quantity = models.PositiveIntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
    # owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='products', on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('created',)