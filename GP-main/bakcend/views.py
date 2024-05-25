from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Transaction
from .serializers import UserSerializer, TransactionSerializer

# User Registration Logic
class UserRegistrationView(APIView):
    def post(self, request):
        # Deserialize user registration data
        serializer = UserSerializer(data=request.data)
        
        # Validate the input data
        if serializer.is_valid():
            # Create a new user instance
            user = serializer.save()
            
            # Generate an authentication token
            token, created = Token.objects.get_or_create(user=user)
            
            # Return the generated token and user data
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        
        # Return errors if input data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login Logic
class LoginView(APIView):
    def post(self, request):
        # Extract username and password from request data
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        # If user is authenticated
        if user:
            # Generate an authentication token
            token, created = Token.objects.get_or_create(user=user)
            
            # Serialize user data
            user_data = UserSerializer(user).data
            
            # Return token and user data
            return Response({
                'token': token.key,
                'username': user_data['username'],
                'email': user_data['email'],
            }, status=status.HTTP_200_OK)
        
        # Return error if authentication fails
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout Logic
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # If user is authenticated
        if request.user.is_authenticated:
            # Delete the authentication token
            request.user.auth_token.delete()
            
            # Return success response
            return Response(status=status.HTTP_200_OK)
        
        # Return error if user is not authenticated
        return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

# Transaction Data Retrieval Logic
class TransactionData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve authenticated user
        user = request.user
        
        # Print logged-in user information (for debugging)
        print("Logged in user:", user)
        print("User ID:", user.id)
        
        # Query transactions associated with the authenticated user
        transactions = Transaction.objects.filter(user=user)
        
        # Print transaction query information (for debugging)
        print("Transactions for user:", transactions.query)  
        print("Transaction count for user:", transactions.count())
        
        # Serialize transaction data
        serializer = TransactionSerializer(transactions, many=True)
        
        # Return serialized transaction data
        return Response(serializer.data)
