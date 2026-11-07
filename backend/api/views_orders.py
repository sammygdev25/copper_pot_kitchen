from rest_framework import viewsets, filters, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta

from api.models import Order, OrderItem, Dish
from api.serializers_orders import OrderSerializer, DashboardStatsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class IsOwnerOrStaff(permissions.BasePermission):
    """
    Customers may only read/write their own orders.
    Staff users may read/write any order.
    Anonymous users may not access orders at all (list/detail require auth).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if getattr(user, 'role', None) == 'staff' or user.is_staff:
            return True
        return obj.user_id == user.id


class OrderViewSet(viewsets.ModelViewSet):
    """
    Cart checkout -> Order creation, order tracking for customers,
    and order management for restaurant staff.
    """
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrStaff]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'user', 'is_paid']
    search_fields = ['status', 'user__username', 'user__email']
    ordering_fields = ['created_at', 'updated_at', 'total_amount']

    def get_queryset(self):
        user = self.request.user
        qs = Order.objects.all().order_by('-created_at')

        if not user or not user.is_authenticated:
            return Order.objects.none()

        if getattr(user, 'role', None) == 'staff' or user.is_staff:
            return qs

        return qs.filter(user=user)

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        self._recalculate_total(order)

    def perform_update(self, serializer):
        user = self.request.user
        is_staff_user = bool(user and (getattr(user, 'role', None) == 'staff' or user.is_staff))
        new_status = self.request.data.get('status')

        if new_status is not None and not is_staff_user:
            raise PermissionDenied('Only staff members may update order status.')

        order = serializer.save()
        self._recalculate_total(order)

    def _recalculate_total(self, order):
        total = order.items.aggregate(
            computed=Sum('price')
        )['computed']
        if total is None:
            total = 0
        if order.total_amount != total:
            order.total_amount = total
            order.save(update_fields=['total_amount', 'updated_at'])


class DashboardStatsView(APIView):
    """
    Aggregate stats for the staff dashboard: revenue, order counts by
    status, and a snapshot of recent activity.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_start = today_start - timedelta(days=7)

        all_orders = Order.objects.all()
        paid_orders = all_orders.filter(is_paid=True)

        total_orders = all_orders.count()
        total_revenue = paid_orders.aggregate(total=Sum('total_amount'))['total'] or 0
        orders_today = all_orders.filter(created_at__gte=today_start).count()
        revenue_today = paid_orders.filter(
            paid_at__gte=today_start
        ).aggregate(total=Sum('total_amount'))['total'] or 0
        orders_this_week = all_orders.filter(created_at__gte=week_start).count()

        status_counts = {
            row['status']: row['count']
            for row in all_orders.values('status').annotate(count=Count('id'))
        }

        pending_orders = status_counts.get('placed', 0) + status_counts.get('preparing', 0)

        top_dishes_qs = (
            Dish.objects.filter(order_items__order__is_paid=True)
            .annotate(units_sold=Sum('order_items__quantity'))
            .order_by('-units_sold')[:5]
        )
        top_dishes = [
            {
                'id': dish.id,
                'name': dish.name,
                'units_sold': dish.units_sold or 0,
            }
            for dish in top_dishes_qs
        ]

        recent_orders = all_orders.order_by('-created_at')[:10]

        data = {
            'total_orders': total_orders,
            'total_revenue': total_revenue,
            'orders_today': orders_today,
            'revenue_today': revenue_today,
            'orders_this_week': orders_this_week,
            'pending_orders': pending_orders,
            'placed_count': status_counts.get('placed', 0),
            'preparing_count': status_counts.get('preparing', 0),
            'ready_count': status_counts.get('ready', 0),
            'completed_count': status_counts.get('completed', 0),
            'top_dishes': top_dishes,
            'recent_orders': OrderSerializer(recent_orders, many=True, context={'request': request}).data,
        }

        return Response(serializer.data, status=status.HTTP_200_OK)