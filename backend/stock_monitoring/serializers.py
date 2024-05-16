from rest_framework import serializers
from .models import Watchlist, StockSymbol

class StockSymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockSymbol
        fields = ['id', 'symbol', 'name']

class WatchlistSerializer(serializers.ModelSerializer):
    symbols = StockSymbolSerializer(many=True , read_only=True)

    class Meta:
        model = Watchlist
        fields = ['id', 'user', 'name', 'symbols']
