from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from .models import NewsModel
from .serializers import BreakingNewsSerializer, CreateNewsSerializer


class BreakingNewsApiView(APIView):
    def get(self, request):
        queryset = NewsModel.objects.all()
        serializer = BreakingNewsSerializer(queryset, many=True)
        return Response(serializer.data)


class CreateNewsFromBotView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        secret = request.data.get("secret", "")
        if secret != settings.BOT_SECRET:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        serializer = CreateNewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
