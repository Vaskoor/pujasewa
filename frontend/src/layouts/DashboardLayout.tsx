import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const baseClass = 'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all';
const active    = `${baseClass} bg-orange-100 text-orange-700`;
const inactive  = `${baseClass} text-gray-600 hover:bg-orange-50 hover:text-orange-600`;

export function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isPandit = user?.role === 'PANDIT';
  const isAdmin  = user?.role === 'ADMIN';

  const customerLinks = [
    { to: '/dashboard',          label: '🏠 Overview'    },
    { to: '/dashboard/bookings', label: '📋 My Bookings' },
    { to: '/dashboard/profile',  label: '👤 Profile'     },
  ];

  const panditLinks = [
    { to: '/dashboard',               label: '🏠 Overview'        },
    { to: '/dashboard/my-bookings',   label: '📋 Assigned Bookings'},
    { to: '/dashboard/calendar',      label: '📅 Calendar'         },
    { to: '/dashboard/earnings',      label: '💰 Earnings'         },
    { to: '/dashboard/profile',       label: '👤 Profile'          },
  ];

  const adminLinks = [
    { to: '/dashboard',               label: '🏠 Overview'   },
    { to: '/dashboard/users',         label: '👥 Users'      },
    { to: '/dashboard/pandits',       label: '🙏 Pandits'    },
    { to: '/dashboard/bookings',      label: '📋 Bookings'   },
    { to: '/dashboard/event-types',   label: '🎉 Event Types'},
    { to: '/dashboard/packages',      label: '📦 Packages'   },
    { to: '/dashboard/inventory',     label: '🏪 Inventory'  },
  ];

  const links = isAdmin ? adminLinks : isPandit ? panditLinks : customerLinks;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 shadow-sm hidden md:flex flex-col pt-6 pb-4 px-3">
        <div className="px-3 mb-6">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            {isAdmin ? 'Admin Panel' : isPandit ? 'Pandit Panel' : 'My Account'}
          </p>
          <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{user?.email}</p>
          <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full font-medium ${
            isAdmin ? 'bg-purple-100 text-purple-700' : isPandit ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {user?.role}
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/dashboard'}
              className={({ isActive }) => isActive ? active : inactive}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-100 px-1 mt-4 space-y-1">
          <NavLink to="/pandits" className={inactive}>🔍 Find Pandits</NavLink>
          <NavLink to="/packages" className={inactive}>📦 Packages</NavLink>
          <NavLink to="/decorations" className={inactive}>🌸 Decorations</NavLink>
          <button onClick={() => { logout(); navigate('/login'); }}
            className={`w-full text-left ${inactive} text-red-500 hover:text-red-600 hover:bg-red-50`}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/dashboard'}
            className={({ isActive }) => `shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            {label}
          </NavLink>
        ))}
      </div>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8 pt-6 md:mt-0 mt-12 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}
