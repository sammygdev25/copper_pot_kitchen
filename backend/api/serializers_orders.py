from decimal import Decimal

from rest_framework import serializers

from api.models import Order, OrderItem, Dish, User


class OrderItemSerializer(serializers.ModelSerializer):
    dish_name = serializers.CharField(source='dish.name', read_only=True)
    dish_price = serializers.DecimalField(source='dish.price', max_digits=6, decimal_places=2, read_only=True, required=False, default=0)
    dish_photo = serializers.ImageField(source='dish.photo', read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'order', 'dish', 'dish_name', 'dish_price', 'dish_photo',
            'quantity', 'price', 'created_at', 'updated_at',
        ]
        read_only_fields = ['order', 'price', 'created_at', 'updated_at']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, required=False)
    user_username = serializers.CharField(source='user.username', read_only=True)
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'user_username', 'status', 'total_amount', 'is_paid',
            'created_at', 'updated_at', 'paid_at', 'stripe_session_id',
            'items', 'item_count',
        ]
        read_only_fields = [
            'user', 'total_amount', 'is_paid', 'paid_at', 'stripe_session_id',
            'created_at', 'updated_at',
        ]

    def get_item_count(self, obj):
        return sum(item.quantity for item in obj.items.all())

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        request = self.context.get('request')
        user = request.user if request else validated_data.get('user')
        order = Order.objects.create(user=user, **validated_data)

        total = Decimal('0.00')
        for item_data in items_data:
            dish = item_data.get('dish')
            quantity = item_data.get('quantity', 1)
            if dish is None:
                continue
            line_price = dish.price
            OrderItem.objects.create(
                order=order,
                dish=dish,
                quantity=quantity,
                price=line_price,
            )
            total += line_price * quantity

        order.total_amount = total
        order.save()
        return order

    def update(self, instance, validated_data):
        validated_data.pop('items', None)
        validated_data.pop('total_amount', None)
        validated_data.pop('is_paid', None)
        validated_data.pop('paid_at', None)
        validated_data.pop('stripe_session_id', None)
        validated_data.pop('user', None)
        return super().update(instance, validated_data)


class DashboardStatsSerializer(serializers.Serializer):
    total_orders = serializers.IntegerField(required=False, default=0)
    orders_today = serializers.IntegerField(required=False, default=0)
    revenue_today = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=0)
    revenue_total = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=0)
    orders_placed = serializers.IntegerField(required=False, default=0)
    orders_preparing = serializers.IntegerField(required=False, default=0)
    orders_ready = serializers.IntegerField(required=False, default=0)
    orders_completed = serializers.IntegerField(required=False, default=0)
    top_dishes = serializers.ListField(child=serializers.DictField(), required=False)
    recent_orders = OrderSerializer(many=True, required=False)

