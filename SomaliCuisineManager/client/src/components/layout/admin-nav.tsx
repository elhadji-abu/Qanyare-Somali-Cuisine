import { Link, useLocation } from 'wouter';
import { BarChart3, Package, Calendar, Users, Star, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function AdminNav() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Orders', href: '/admin/orders', icon: Package },
    { name: 'Reservations', href: '/admin/reservations', icon: Calendar },
    { name: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Staff', href: '/admin/staff', icon: Users },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                      fontWeight: isActive ? '600' : '500',
                      fontSize: '14px',
                      userSelect: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      }
                    }}
                  >
                    <Icon style={{ width: '16px', height: '16px' }} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/">
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Back to Site
              </div>
            </Link>
            <div
              onClick={logout}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: 'none',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
