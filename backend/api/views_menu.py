from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from api.models import Category, Dish
from api.serializers_menu import CategorySerializer, DishSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    lookup_field = 'slug'
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = []
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']


class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all().order_by('category', 'name')
    serializer_class = DishSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = []
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'name', 'created_at']