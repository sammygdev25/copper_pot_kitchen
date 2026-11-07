"""Views aggregator — explicit imports from domain view files."""
from .views_auth import CustomAuthToken, LogoutView, ProfileView, RegisterView  # noqa: F401
from .views_menu import CategoryViewSet, DishViewSet  # noqa: F401
from .views_orders import DashboardStatsView, IsOwnerOrStaff, OrderViewSet  # noqa: F401
