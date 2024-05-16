from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Watchlist, StockSymbol
from .serializers import WatchlistSerializer, StockSymbolSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

class WatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk is not None:
            watchlist = get_object_or_404(Watchlist.objects.filter(user=request.user), pk=pk)
            serializer = WatchlistSerializer(watchlist)
            return Response(serializer.data)
        else:
            watchlists = Watchlist.objects.filter(user=request.user)
            serializer = WatchlistSerializer(watchlists, many=True)
            return Response(serializer.data)
    
    def post(self, request):
        user = request.user
        data = request.data
        data['user'] = user.id
        serializer = WatchlistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        watchlist = Watchlist.objects.get(pk=pk)
        user = request.user
        data = request.data
        data['user'] = user.id

        existing_symbol_ids = list(watchlist.symbols.all().values_list('id', flat=True))
        symbols_data = [symbol['id'] for symbol in data.pop('symbols', [])]
        for symbol in existing_symbol_ids:
            if symbol not in symbols_data:
                watchlist.symbols.remove(symbol)
        
        for symbol in symbols_data:
            if symbol not in existing_symbol_ids:
                watchlist.symbols.add(symbol)

        return Response(WatchlistSerializer(watchlist).data)


    def delete(self, request, pk):
        watchlist = Watchlist.objects.get(pk=pk)
        watchlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StockSymbolView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StockSymbolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        symbols = StockSymbol.objects.all()
        serializer = StockSymbolSerializer(symbols, many=True)
        return Response(serializer.data)
