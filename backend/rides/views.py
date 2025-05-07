from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ride
from .serializers import RideSerializer

class RidePostView(generics.CreateAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(driver=self.request.user)

class RideJoinView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id)
        except Ride.DoesNotExist:
            return Response({"error": "Ride not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.user in ride.passengers.all():
            return Response({"detail": "Already joined"}, status=status.HTTP_400_BAD_REQUEST)

        ride.passengers.add(request.user)
        return Response({"detail": "Successfully joined ride"})

class PostedRidesView(generics.ListAPIView):
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Ride.objects.filter(driver=self.request.user)

class JoinedRidesView(generics.ListAPIView):
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Ride.objects.filter(passengers=self.request.user)

class CancelRideView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, ride_id):
        try:
            ride = Ride.objects.get(id=ride_id, driver=request.user)
        except Ride.DoesNotExist:
            return Response({"error": "Ride not found or not owned by user"}, status=status.HTTP_404_NOT_FOUND)

        ride.delete()
        return Response({"detail": "Ride cancelled successfully"}, status=status.HTTP_204_NO_CONTENT)
