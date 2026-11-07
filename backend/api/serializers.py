"""Serializers aggregator — explicit imports from domain files."""
from .serializers_auth import LoginSerializer, RegisterSerializer, UserSerializer  # noqa: F401
from .serializers_menu import CategorySerializer, DishSerializer  # noqa: F401
from .serializers_orders import DashboardStatsSerializer, OrderItemSerializer, OrderSerializer  # noqa: F401
"""Serializers aggregator — explicit imports from domain files."""
