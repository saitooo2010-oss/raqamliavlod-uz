from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import UserModel
from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer

# Create your views here.


class RegisterView(CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)


class LoginView(CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({
                "error": "Foydalanuvchi nomi yoki parol noto'g'ri"
            }, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)


class ProfileView(RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
