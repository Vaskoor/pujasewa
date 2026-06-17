import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  X,
  ChevronRight,
  User,
  LogOut,
  BookOpen,
  Heart,
  HelpCircle,
  Phone,
  Info,
  ShoppingBag,
  Sparkles,
  PartyPopper,
  Palette,
  Camera,
  Home,
  Gem,
  Crown,
  ChevronDown,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const mainLinks = [
    { to: '/', label: 'Home' },
    { to: '/pandits', label: 'Find Pandits' },
    { to: '/packages', label: 'Packages' },
    { to: '/decorations', label: 'Decorations' },
    { to: '/venue', label: 'Venues' },
    { to: '/photography', label: 'Photography' },
    { to: '/custom-puja', label: 'Custom Puja' },
  ];

  const serviceLinks = [
    { to: '/pandits', label: 'Pandit Services', icon: BookOpen },
    { to: '/boutique', label: 'Wedding Boutique', icon: ShoppingBag },
    { to: '/bridal-makeup', label: 'Bridal Makeup', icon: Sparkles },
    { to: '/events-makeup', label: 'Events Makeup', icon: PartyPopper },
    { to: '/decorations', label: 'Decorations', icon: Palette },
    { to: '/photography', label: 'Photography', icon: Camera },
    { to: '/venue', label: 'Venues', icon: Home },
    { to: '/packages', label: 'Packages', icon: Gem },
  ];

  const aboutLinks = [
    { to: '/about', label: 'About Us', icon: Info },
    { to: '/how-it-works', label: 'How It Works', icon: HelpCircle },
    { to: '/testimonials', label: 'Testimonials', icon: Heart },
    { to: '/blog', label: 'Blog', icon: BookOpen },
    { to: '/faq', label: 'FAQ', icon: HelpCircle },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E6E4E0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8B5A2B] flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-lg font-bold text-[#1a1410]">
              Puja<span className="text-[#8B5A2B]">Sewa</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#FDF8F3] transition-colors"
          >
            <X className="w-5 h-5 text-[#1a1410]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* User Section */}
          {isAuthenticated && user && (
            <div className="p-4 bg-[#FDF8F3] border-b border-[#E6E4E0]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#8B5A2B] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1a1410]">
                    {user.profile?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-[#8a8a8a]">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex-1 text-center py-2 rounded-lg bg-white text-sm font-medium text-[#8B5A2B] border border-[#E6E4E0] hover:bg-[#FAF9F7] transition-colors"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex-1 text-center py-2 rounded-lg bg-white text-sm font-medium text-[#8B5A2B] border border-[#E6E4E0] hover:bg-[#FAF9F7] transition-colors"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}

          {/* Main Links */}
          <div className="p-4 border-b border-[#E6E4E0]">
            <p className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider mb-3">
              Navigation
            </p>
            <div className="space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-[#FDF8F3] text-[#8B5A2B]'
                      : 'text-[#4a4a4a] hover:bg-[#FAF9F7]'
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-[#8a8a8a]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services Accordion */}
          <div className="p-4 border-b border-[#E6E4E0]">
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="flex items-center justify-between w-full mb-3"
            >
              <p className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                All Services
              </p>
              <ChevronDown
                className={`w-4 h-4 text-[#8a8a8a] transition-transform ${
                  servicesExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`space-y-1 overflow-hidden transition-all duration-300 ${
                servicesExpanded ? 'max-h-96' : 'max-h-0'
              }`}
            >
              {serviceLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? 'bg-[#FDF8F3] text-[#8B5A2B]'
                        : 'text-[#4a4a4a] hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* About Links */}
          <div className="p-4 border-b border-[#E6E4E0]">
            <p className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider mb-3">
              Company
            </p>
            <div className="space-y-1">
              {aboutLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? 'bg-[#FDF8F3] text-[#8B5A2B]'
                        : 'text-[#4a4a4a] hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E6E4E0] bg-white">
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                onClick={onClose}
                className="flex-1 text-center py-3 rounded-xl text-sm font-medium text-[#4a4a4a] border border-[#E6E4E0] hover:bg-[#FAF9F7] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="flex-1 text-center py-3 rounded-xl text-sm font-medium bg-[#8B5A2B] text-white hover:bg-[#654321] transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
