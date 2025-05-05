from django.urls import path
from .views import RegisterView, RideListView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # POST: register
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # POST: login
    path('rides/', RideListView.as_view(), name='ride_list'),  # GET: list, POST: create
]
