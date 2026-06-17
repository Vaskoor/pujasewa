import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { VerifyEmail } from '../pages/VerifyEmail';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { PanditDirectoryPage } from '../pages/pandits/PanditDirectoryPage';
import { PanditPortfolioPage } from '../pages/pandits/PanditPortfolioPage';
import { PanditListing } from '../pages/PanditListing';
import { BookingPage } from '../pages/booking/BookingPage';
import { PackagesPage } from '../pages/packages/PackagesPage';
import { DecorationsPage } from '../pages/decorations/DecorationsPage';
import { PhotographyPage } from '../pages/photography/PhotographyPage';
import { VenuePage } from '../pages/venue/VenuePage';
import { CustomPujaPage } from '../pages/custom/CustomPujaPage';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import FAQPage from '../pages/faq/FAQPage';
import HowItWorksPage from '../pages/how-it-works/HowItWorksPage';
import { CustomerDashboard as Dashboard } from '../pages/customer/Dashboard';
import { MyBookings } from '../pages/customer/MyBookings';
import { CustomerProfile as Profile } from '../pages/customer/Profile';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUsers as UsersList } from '../pages/admin/UsersList';
import { AdminPandits as PanditsList } from '../pages/admin/PanditsList';
import { AdminEventTypes as EventTypes } from '../pages/admin/EventTypes';
import { AdminInventory as Inventory } from '../pages/admin/Inventory';
import { AdminPackages as Packages } from '../pages/admin/Packages';
import { AdminPendingPayments as PendingPayments } from '../pages/admin/PendingPayments';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PaymentPage } from '../pages/payment/PaymentPage';
import { PaymentSuccess } from '../pages/payment/PaymentSuccess';
import { PaymentFailure } from '../pages/payment/PaymentFailure';
import { PanditCalendar as Calendar } from '../pages/pandit/Calendar';
import { PanditBookings } from '../pages/pandit/PanditBookings';
import { PanditEarnings as Earnings } from '../pages/pandit/Earnings';
import { NotFound } from '../pages/NotFound';
import { TestimonialsPage } from '../pages/testimonials/TestimonialsPage';
import { BlogPage } from '../pages/blog/BlogPage';
import { BlogPostPage } from '../pages/blog/BlogPostPage';
import { ServicesPage } from '../pages/services/ServicesPage';
import { BoutiquePage } from '../pages/boutique/BoutiquePage';
import { BridalMakeupPage } from '../pages/bridal-makeup/BridalMakeupPage';
import { EventsMakeupPage } from '../pages/events-makeup/EventsMakeupPage';
import { CmsPage } from '../pages/CmsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pandits" element={<PanditDirectoryPage />} />
      <Route path="/pandit/:id" element={<PanditPortfolioPage />} />
      <Route path="/pandit-listing" element={<PanditListing />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/decorations" element={<DecorationsPage />} />
      <Route path="/photography" element={<PhotographyPage />} />
      <Route path="/venue" element={<VenuePage />} />
      <Route path="/custom-puja" element={<CustomPujaPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/boutique" element={<BoutiquePage />} />
      <Route path="/bridal-makeup" element={<BridalMakeupPage />} />
      <Route path="/events-makeup" element={<EventsMakeupPage />} />
      <Route path="/cms/:slug" element={<CmsPage />} />

      {/* Customer */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'PANDIT', 'ADMIN']}><Dashboard /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><MyBookings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'PANDIT', 'ADMIN']}><Profile /></ProtectedRoute>} />

      {/* Pandit */}
      <Route path="/pandit/calendar" element={<ProtectedRoute allowedRoles={['PANDIT', 'ADMIN']}><Calendar /></ProtectedRoute>} />
      <Route path="/pandit/bookings" element={<ProtectedRoute allowedRoles={['PANDIT', 'ADMIN']}><PanditBookings /></ProtectedRoute>} />
      <Route path="/pandit/earnings" element={<ProtectedRoute allowedRoles={['PANDIT', 'ADMIN']}><Earnings /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><UsersList /></ProtectedRoute>} />
      <Route path="/admin/pandits" element={<ProtectedRoute allowedRoles={['ADMIN']}><PanditsList /></ProtectedRoute>} />
      <Route path="/admin/event-types" element={<ProtectedRoute allowedRoles={['ADMIN']}><EventTypes /></ProtectedRoute>} />
      <Route path="/admin/inventory" element={<ProtectedRoute allowedRoles={['ADMIN']}><Inventory /></ProtectedRoute>} />
      <Route path="/admin/packages" element={<ProtectedRoute allowedRoles={['ADMIN']}><Packages /></ProtectedRoute>} />
      <Route path="/admin/pending-payments" element={<ProtectedRoute allowedRoles={['ADMIN']}><PendingPayments /></ProtectedRoute>} />

      {/* Payment */}
      <Route path="/payment/:bookingId" element={<PaymentPage />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failure" element={<PaymentFailure />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}