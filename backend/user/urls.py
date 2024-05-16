from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import LoginView, RegisterView, UserView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user'),
    path("refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
]
