import './App.css';
import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { Footer } from './components/ui';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import StaffDishesPage from './pages/StaffDishesPage';
import StaffCategoriesPage from './pages/StaffCategoriesPage';
import StaffOrdersPage from './pages/StaffOrdersPage';
import DishListPage from './pages/DishListPage';
import OrderPayPage from './pages/OrderPayPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import UnpaidNotice from './components/UnpaidNotice';

interface RequireAuthProps { children: ReactNode }

function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth() as { isAuthenticated?: boolean; loading?: boolean };
  if (auth && auth.loading) {
    return null;
  }
  const authed = auth && typeof auth.isAuthenticated === 'boolean' ? auth.isAuthenticated : Boolean(localStorage.getItem('token'));
  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ErrorBoundary>
          <div className="ds-page">
            <Navbar />
            <main className="ds-page-main">
              <UnpaidNotice />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
                <Route path="/orders" element={<RequireAuth><MyOrdersPage /></RequireAuth>} />
                <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/staff/dashboard" element={<RequireAuth><StaffDashboardPage /></RequireAuth>} />
                <Route path="/staff/dishes" element={<RequireAuth><StaffDishesPage /></RequireAuth>} />
                <Route path="/staff/categories" element={<RequireAuth><StaffCategoriesPage /></RequireAuth>} />
                <Route path="/staff/orders" element={<RequireAuth><StaffOrdersPage /></RequireAuth>} />
                <Route path="/dishes" element={<DishListPage />} />
                <Route path="/order-pay" element={<RequireAuth><OrderPayPage /></RequireAuth>} />
                <Route path="/payment-cancel" element={<PaymentCancelPage />} />
                <Route path="/payment-success" element={<RequireAuth><PaymentSuccessPage /></RequireAuth>} />
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer brand="Copper Pot Kitchen" columns={[{ title: 'Explore', links: [{ label: 'Home', to: '/' }, { label: 'Dishes', to: '/dishes' }] }]} />
          </div>
        </ErrorBoundary>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
