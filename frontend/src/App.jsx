import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LearningCentrePage from './pages/LearningCentrePage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import SellBusinessPage from './pages/SellBusinessPage';
import BuyBusinessPage from './pages/BuyBusinessPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <ScrollToTop />
      {!isAdminRoute && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/learning-centre" element={<LearningCentrePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sell-business" element={<SellBusinessPage />} />
          <Route path="/buy-business" element={<BuyBusinessPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
