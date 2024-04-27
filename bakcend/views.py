from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

# Signin logic
class UserRegistrationView(APIView):
    def post(self, request):
        # from the incoming data we Initializes an instance 
        serializer = UserSerializer(data=request.data)
        # we check if the data is valid 
        if serializer.is_valid():
            # if valid saves the user data to the database and creates a new User 
            user = serializer.save()
            # token generated for the user (for logout session later on)
            token, created = Token.objects.get_or_create(user=user)
            # if valid Returns a response with the user data and HTTP 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # if data is not valid, returns errors with HTTP 400 Bad Request status.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Login logic
class LoginView(APIView):
    def post(self, request):
        # from the requested data we extract the user and password
        username = request.data.get('username')
        password = request.data.get('password')
        # we check the user in database 
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# Logout logic
class LogoutView(APIView):
    # we only set the access for authenticated users
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        print("User:", request.user)
        print("Is Authenticated:", request.user.is_authenticated)
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)