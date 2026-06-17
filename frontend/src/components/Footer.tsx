import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Find Pandits', to: '/pandits' },
    { label: 'Packages', to: '/packages' },
    { label: 'Decorations', to: '/decorations' },
    { label: 'Photography', to: '/photography' },
    { label: 'Venues', to: '/venue' },
    { label: 'Custom Puja', to: '/custom-puja' },
  ];

  const services = [
    { label: 'Wedding Pandits', to: '/pandits?event=Marriage' },
    { label: 'Bratabandha', to: '/pandits?event=Bratabandha' },
    { label: 'Griha Pravesh', to: '/pandits?event=Griha%20Pravesh' },
    { label: 'Satyanarayan Puja', to: '/pandits?event=Satyanarayan%20Puja' },
    { label: 'Funeral Rituals', to: '/pandits?event=Funeral%20Rituals' },
  ];

  const company = [
    { label: 'About Us', to: '/about' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ];

  const support = [
    { label: 'Help Center', to: '/faq' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Refund Policy', to: '/refund' },
    { label: 'Sitemap', to: '/sitemap' },
  ];

  return (
    <footer className="bg-primary-900 text-white/70">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-2xl font-semibold text-white tracking-tight">
                Puja<span className="text-primary-300">Sewa</span>
              </h3>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs font-light">
              Nepal's premier platform for authentic Vedic ceremonies. Connecting devotees with verified pandits, decorations, venues, and complete spiritual services since 2020.
            </p>

            {/* Contact Info — clean, no icons */}
            <div className="space-y-2.5 pt-1">
              <div className="text-sm text-white/50 font-light">
                <span className="text-white/30 text-xs uppercase tracking-widest mr-2">Address</span>
                Kathmandu, Nepal
              </div>
              <div className="text-sm text-white/50 font-light">
                <span className="text-white/30 text-xs uppercase tracking-widest mr-2">Phone</span>
                +977 980-123-4567
              </div>
              <div className="text-sm text-white/50 font-light">
                <span className="text-white/30 text-xs uppercase tracking-widest mr-2">Email</span>
                hello@pujasewa.com
              </div>
              <div className="text-sm text-white/50 font-light">
                <span className="text-white/30 text-xs uppercase tracking-widest mr-2">Hours</span>
                Daily: 6:00 AM – 9:00 PM
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-primary-300 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-primary-300 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-primary-300 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-white text-sm uppercase tracking-widest mb-5">
              Support
            </h4>
            <ul className="space-y-2.5">
              {support.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-primary-300 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30 font-light tracking-wide">
              &copy; {new Date().getFullYear()} PujaSewa. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide">
                Terms
              </Link>
              <Link to="/cookies" className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
