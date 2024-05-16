from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
        if user:
            user_serializer = UserSerializer(user)
            response.data.update({'user': user_serializer.data})
        return response

class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            password = request.data.get('password')
            user = User.objects.create_user(**serializer.validated_data, password=password)
            user.save()
            refresh = RefreshToken.for_user(user)
            
            user_serializer = UserSerializer(user)
            
            return Response({
                "user": user_serializer.data,
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)