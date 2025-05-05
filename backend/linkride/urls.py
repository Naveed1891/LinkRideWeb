from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Routes from the 'rides' app (includes /register/, /token/, /rides/)
    path('api/', include('rides.urls')),

    # Optional JWT refresh route if not already handled inside rides.urls
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # If 'users' app has separate routes (optional)
    path('api/auth/', include('users.urls')),
]
