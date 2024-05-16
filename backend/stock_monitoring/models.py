from django.db import models
from django.contrib.auth.models import User

class StockSymbol(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.symbol

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    symbols = models.ManyToManyField(StockSymbol, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Watchlist"