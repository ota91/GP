from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, TransactionSerializer
from .models import Transaction

# Signin logic
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login logic
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            user_data = UserSerializer(user).data
            return Response({
                'token': token.key,
                'username': user_data['username'],
                'email': user_data['email'],
            }, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout logic
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

class TransactionData(APIView):
    permission_classes = [IsAuthenticated]

# some lines not important only for debugging
    def get(self, request):
        user = request.user
        print("Logged in user:", user)
        print("User ID:", user.id)
        transactions = Transaction.objects.filter(user=user)
        print("Transactions for user:", transactions.query)  
        print("Transaction count for user:", transactions.count())
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
