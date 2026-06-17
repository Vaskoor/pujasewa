import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MobileMenu } from './MobileMenu';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Heart,
  Calendar,
  Search,
  Sparkles,
  ShoppingBag,
  Palette,
  Camera,
  Gem,
  Crown,
  PartyPopper,
  Home,
  BookOpen,
  Phone,
  HelpCircle,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Pandits', to: '/pandits' },
  {
    label: 'Services',
    to: '/services',
    children: [
      {
        label: 'Pandit Services',
        description: 'Verified Vedic priests for all ceremonies',
        to: '/pandits',
        icon: BookOpen,
        color: 'bg-amber-50 text-amber-700',
      },
      {
        label: 'Wedding Boutique',
        description: 'Bridal lehengas, jewelry & accessories',
        to: '/boutique',
        icon: ShoppingBag,
        color: 'bg-rose-50 text-rose-700',
      },
      {
        label: 'Bridal Makeup',
        description: 'Professional bridal & mehndi artists',
        to: '/bridal-makeup',
        icon: Sparkles,
        color: 'bg-pink-50 text-pink-700',
      },
      {
        label: 'Events Makeup',
        description: 'Party, sangeet & reception makeup',
        to: '/events-makeup',
        icon: PartyPopper,
        color: 'bg-purple-50 text-purple-700',
      },
      {
        label: 'Decorations',
        description: 'Mandap, floral & venue decoration',
        to: '/decorations',
        icon: Palette,
        color: 'bg-orange-50 text-orange-700',
      },
      {
        label: 'Photography',
        description: 'Candid, cinematic & traditional',
        to: '/photography',
        icon: Camera,
        color: 'bg-blue-50 text-blue-700',
      },
      {
        label: 'Venues',
        description: 'Banquet halls, gardens & temples',
        to: '/venue',
        icon: Home,
        color: 'bg-emerald-50 text-emerald-700',
      },
      {
        label: 'Packages',
        description: 'All-inclusive ceremony packages',
        to: '/packages',
        icon: Gem,
        color: 'bg-teal-50 text-teal-700',
      },
    ],
  },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E6E4E0]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#8B5A2B] flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-[#1a1410] tracking-tight">
                Puja<span className="text-[#8B5A2B]">Sewa</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          servicesOpen || link.children.some((c) => isActive(c.to))
                            ? 'text-[#8B5A2B] bg-[#FDF8F3]'
                            : 'text-[#4a4a4a] hover:text-[#8B5A2B] hover:bg-[#FDF8F3]'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            servicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Mega Dropdown */}
                      {servicesOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                          <div className="bg-white rounded-2xl shadow-xl border border-[#E6E4E0] p-4 w-[640px]">
                            <div className="grid grid-cols-2 gap-2">
                              {link.children.map((child) => {
                                const Icon = child.icon;
                                return (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF9F7] transition-all duration-200 group"
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-lg ${child.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                                    >
                                      <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-sm text-[#1a1410] group-hover:text-[#8B5A2B] transition-colors">
                                        {child.label}
                                      </p>
                                      <p className="text-xs text-[#8a8a8a] mt-0.5 leading-relaxed">
                                        {child.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="mt-3 pt-3 border-t border-[#E6E4E0]">
                              <Link
                                to="/services"
                                className="flex items-center justify-center gap-2 text-sm font-medium text-[#8B5A2B] hover:text-[#654321] transition-colors py-2"
                              >
                                View All Services
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.to)
                        ? 'text-[#8B5A2B] bg-[#FDF8F3]'
                        : 'text-[#4a4a4a] hover:text-[#8B5A2B] hover:bg-[#FDF8F3]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Link
                to="/pandits"
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-[#8a8a8a] hover:text-[#8B5A2B] hover:bg-[#FDF8F3] transition-all"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#FDF8F3] transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#8B5A2B] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#1a1410]">
                      {user?.profile?.fullName?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a8a8a] transition-transform ${
                        profileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E6E4E0] py-2 z-50">
                      <div className="px-4 py-3 border-b border-[#E6E4E0]">
                        <p className="font-medium text-sm text-[#1a1410]">
                          {user?.profile?.fullName || 'User'}
                        </p>
                        <p className="text-xs text-[#8a8a8a] mt-0.5">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4a4a4a] hover:bg-[#FDF8F3] hover:text-[#8B5A2B] transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        My Bookings
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#4a4a4a] hover:bg-[#FDF8F3] hover:text-[#8B5A2B] transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#4a4a4a] hover:text-[#8B5A2B] hover:bg-[#FDF8F3] transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[#8B5A2B] text-white hover:bg-[#654321] transition-all shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#FDF8F3] transition-all"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-[#1a1410]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#1a1410]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
