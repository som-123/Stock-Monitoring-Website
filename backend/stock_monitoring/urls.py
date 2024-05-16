from django.urls import path
from .views import WatchlistView

urlpatterns = [
    path('watchlists/', WatchlistView.as_view(), name='watchlist'),
]
