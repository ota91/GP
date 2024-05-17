from django.urls import path
from .views import TransactionData, LoginView, UserRegistrationView, LogoutView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('transactions/', TransactionData.as_view(), name='transactions'),
]
