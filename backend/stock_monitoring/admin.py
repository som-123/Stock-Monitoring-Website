from django.contrib import admin
from .models import StockSymbol, Watchlist

@admin.register(StockSymbol)
class StockSymbolAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name')
    search_fields = ('symbol', 'name')

@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'name')
    search_fields = ('user__username', 'name')
