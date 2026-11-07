from rest_framework import serializers
from api.models import Category, Dish


class CategorySerializer(serializers.ModelSerializer):
    dish_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'created_at', 'updated_at', 'dish_count',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def get_dish_count(self, obj):
        return obj.dishes.count()


class DishSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Dish
        fields = [
            'id', 'name', 'category', 'category_name', 'price', 'description',
            'photo', 'is_vegetarian', 'is_spicy', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    photo = serializers.SerializerMethodField()
    def get_photo(self, obj):
        val = getattr(obj, 'photo', None)
        if not val:
            return None
        val_str = str(val)
        if val_str.startswith(('http', 'data:', '/')):
            return val_str
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(val.url)
        return val.url

