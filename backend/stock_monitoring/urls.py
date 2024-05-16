from django.urls import path
from .views import WatchlistView, StockSymbolView

urlpatterns = [
    path('watchlists/', WatchlistView.as_view(), name='watchlist'),
    path('watchlists/<int:pk>/', WatchlistView.as_view(), name='watchlist_detail'),
    path('symbols/', StockSymbolView.as_view(), name='symbols'),
]
