from django.conf import settings
"""
Models for copper_pot_kitchen — auto-generated from ProjectContract.
DO NOT EDIT — regenerate from contract if changes needed.
"""
from django.db import models


from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    role = models.CharField(max_length=10, choices=[['customer', 'Customer'], ['staff', 'Staff']], default='customer')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['username']

    def __str__(self):
        return str(self.role)


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return str(self.name)


class Dish(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(to='Category', on_delete=models.CASCADE, related_name='dishes')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to='dishes/', blank=True, null=True)
    is_vegetarian = models.BooleanField(default=False)
    is_spicy = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return str(self.name)


class Order(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=[['placed', 'Placed'], ['preparing', 'Preparing'], ['ready', 'Ready'], ['completed', 'Completed']], default='placed')
    total_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    stripe_session_id = models.CharField(max_length=255, null=True, blank=True, unique=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.status)


class OrderItem(models.Model):
    order = models.ForeignKey(to='Order', on_delete=models.CASCADE, related_name='items')
    dish = models.ForeignKey(to='Dish', on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return str(self.dish)

