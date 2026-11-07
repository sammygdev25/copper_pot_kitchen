import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartHeader from '../components/CartHeader';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';
import { Alert } from '../components/ui';
import api from '../api';

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateQuantity = (dishId: number, quantity: number) => {
    updateQuantity(dishId, quantity);
  };

  const handleRemove = (dishId: number) => {
    removeItem(dishId);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (items.length === 0) return;
    setError('');
    setSuccess('');
    try {
      const payload = {
        items: (Array.isArray(items) ? items : []).map((item: any) => ({
          dish: item.dishId,
          quantity: item.quantity,
        })),
      };
      const response = await api.post('/orders/', payload);
      const order = response.data;
      clearCart();
      setSuccess('Order placed! Redirecting to payment...');
      setTimeout(() => {
        navigate(`/order-pay?order=${order.id}`);
      }, 1200);
    } catch (err) {
      setError('Could not place your order. Please try again.');
      throw err;
    }
  };

  return (
    <div className="ds-stack-lg">
      <CartHeader itemCount={itemCount} />
      {error && <Alert tone="danger">{error}</Alert>}
      {success && <Alert tone="success">{success}</Alert>}
      <CartItems
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        sidebar={<CartSummary total={total} onCheckout={handleCheckout} />}
      />
    </div>
  );
}