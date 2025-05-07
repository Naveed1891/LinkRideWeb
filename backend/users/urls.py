from django.urls import path
from .views import RegisterView, LoginView, PostedRidesView, JoinedRidesView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),  # custom login
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("rides/posted/", PostedRidesView.as_view(), name="posted-rides"),
    path("rides/joined/", JoinedRidesView.as_view(), name="joined-rides"),
]
