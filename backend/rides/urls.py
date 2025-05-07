from django.urls import path
from .views import (
    RidePostView, RideJoinView, PostedRidesView, JoinedRidesView, CancelRideView
)

urlpatterns = [
    path('rides/', RidePostView.as_view(), name='ride-post'),
    path('rides/<int:ride_id>/join/', RideJoinView.as_view(), name='ride-join'),
    path('rides/posted/', PostedRidesView.as_view(), name='posted-rides'),
    path('rides/joined/', JoinedRidesView.as_view(), name='joined-rides'),
    path('rides/<int:ride_id>/cancel/', CancelRideView.as_view(), name='ride-cancel'),
]