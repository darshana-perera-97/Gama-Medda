import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Dashboard } from './screens/Dashboard';
import { Bazaar } from './screens/Bazaar';
import { CultureCenter } from './screens/CultureCenter';
import { Games } from './screens/Games';
import { Profile } from './screens/Profile';
import { AdminLogin } from './screens/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { AdminLeaderboard } from './screens/admin/AdminLeaderboard';
import { AdminItems } from './screens/admin/AdminItems';
import { AdminOrders } from './screens/admin/AdminOrders';
import { AdminPricing } from './screens/admin/AdminPricing';
import { ElephantGame } from './screens/games/ElephantGame';
import { PotsGame } from './screens/games/PotsGame';
import { PoleGame } from './screens/games/PoleGame';
import { PillowFightGame } from './screens/games/PillowFightGame';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/leaderboard"
                element={
                  <AdminLayout>
                    <AdminLeaderboard />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/items"
                element={
                  <AdminLayout>
                    <AdminItems />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/pricing"
                element={
                  <AdminLayout>
                    <AdminPricing />
                  </AdminLayout>
                }
              />

              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Dashboard />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/bazaar"
                element={
                  <>
                    <Navbar />
                    <Bazaar />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/culture"
                element={
                  <>
                    <Navbar />
                    <CultureCenter />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/games"
                element={
                  <>
                    <Navbar />
                    <Games />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <Profile />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/game/elephant"
                element={
                  <>
                    <Navbar />
                    <ElephantGame />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/game/pots"
                element={
                  <>
                    <Navbar />
                    <PotsGame />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/game/pole"
                element={
                  <>
                    <Navbar />
                    <PoleGame />
                    <Cart />
                  </>
                }
              />
              <Route
                path="/game/pillow"
                element={
                  <>
                    <Navbar />
                    <PillowFightGame />
                    <Cart />
                  </>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
    </HelmetProvider>
  );
}

  export default App;
