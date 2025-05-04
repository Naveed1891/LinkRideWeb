from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Ride, RideParticipant
from .serializers import RideSerializer, RideParticipantSerializer, UserSerializer
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RideListCreateView(generics.ListCreateAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(driver=self.request.user)

class RideDetailView(generics.RetrieveAPIView):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [IsAuthenticated]

class JoinRideView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        ride = Ride.objects.get(id=pk)
        RideParticipant.objects.create(ride=ride, user=request.user)
        return Response({'message': 'Joined ride!'}, status=status.HTTP_201_CREATED)

class CheckInView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        participant = RideParticipant.objects.get(ride_id=pk, user=request.user)
        participant.checked_in = True
        participant.save()
        return Response({'message': 'Checked in!'}, status=status.HTTP_200_OK)

class CheckOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        participant = RideParticipant.objects.get(ride_id=pk, user=request.user)
        participant.checked_out = True
        participant.save()
        return Response({'message': 'Checked out!'}, status=status.HTTP_200_OK)
class RideListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rides = Ride.objects.all()
        serializer = RideSerializer(rides, many=True)
        return Response(serializer.data)
        from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            User.objects.create_user(username=username, password=password)
            return Response({'message': 'User registered successfully'})
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
