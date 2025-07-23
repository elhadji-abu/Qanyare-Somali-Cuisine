import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Package, Calendar, DollarSign, Users, Star, TrendingUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminNav from '@/components/layout/admin-nav';
import { AnalyticsStats } from '@/lib/types';

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { data: stats, isLoading } = useQuery<AnalyticsStats>({
    queryKey: ['/api/analytics/stats'],
  });

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 12%, #f093fb 24%, #f5576c 36%, #4facfe 48%, #00f2fe 60%, #43e97b 72%, #38f9d7 84%, #ffecd2 96%, #fcb69f 100%)',
        animation: 'gradientShift 8s ease infinite',
        backgroundSize: '400% 400%'
      }}>
        <AdminNav />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(255,255,255,0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '1rem', color: 'white', fontSize: '1.1rem', fontWeight: '500' }}>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: Package,
      color: 'bg-primary',
      change: '+12%',
    },
    {
      title: 'Reservations',
      value: stats?.totalReservations || 0,
      icon: Calendar,
      color: 'bg-accent',
      change: '+8%',
    },
    {
      title: 'Revenue',
      value: `KES ${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'bg-success',
      change: '+15%',
    },
    {
      title: 'Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'bg-secondary',
      change: '+5%',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 12%, #f093fb 24%, #f5576c 36%, #4facfe 48%, #00f2fe 60%, #43e97b 72%, #38f9d7 84%, #ffecd2 96%, #fcb69f 100%)',
      animation: 'gradientShift 8s ease infinite',
      backgroundSize: '400% 400%'
    }}>
      <AdminNav />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          marginBottom: '3rem',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea, #f093fb, #4facfe, #43e97b, #fcb69f)'
          }}></div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontFamily: 'Playfair Display', 
            fontWeight: 'bold', 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            marginBottom: '1rem'
          }}>Admin Dashboard</h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.2rem', 
            fontWeight: '500' 
          }}>Manage your restaurant with powerful insights and controls</p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '3rem' 
        }}>
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const gradients = [
              'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)', 
              'linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #38f9d7 100%)',
              'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #667eea 100%)'
            ];
            return (
              <div 
                key={index} 
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: gradients[index]
                }}></div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      marginBottom: '0.5rem', 
                      fontSize: '0.9rem', 
                      fontWeight: '500' 
                    }}>{stat.title}</p>
                    <p style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      background: gradients[index],
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>{stat.value}</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp style={{ width: '16px', height: '16px', marginRight: '0.25rem' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{stat.change}</span>
                      <span style={{ fontSize: '0.85rem', opacity: '0.8', marginLeft: '0.25rem' }}>from last month</span>
                    </div>
                  </div>
                  <div style={{
                    background: gradients[index],
                    padding: '1rem',
                    borderRadius: '50%',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  }}>
                    <Icon style={{ width: '32px', height: '32px' }} />
                  </div>
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '12px', 
                  padding: '0.75rem', 
                  textAlign: 'center' 
                }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '500' }}>Performance indicator</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #667eea, #f093fb, #4facfe)'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                padding: '0.75rem',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
              }}>
                <Package style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontFamily: 'Playfair Display', 
                fontWeight: 'bold', 
                color: 'white' 
              }}>Recent Activity</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #667eea',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                  }}>
                    <Package style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>New order from Ahmed Hassan</p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Bariis Iskukaris - KES 800</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #8360c3',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #8360c3, #2ebf91)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(131, 96, 195, 0.3)'
                  }}>
                    <Calendar style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>New reservation by Fatima Mohamed</p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Aroos celebration - Table for 6</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>15 minutes ago</p>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #2ebf91',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(17, 153, 142, 0.3)'
                  }}>
                    <Star style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>New 5-star review</p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Ibrahim Ali - "Outstanding service!"</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Dishes */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #43e97b, #38f9d7, #fcb69f)'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2ebf91, #8fd3f4)',
                padding: '0.75rem',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(46, 191, 145, 0.3)'
              }}>
                <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontFamily: 'Playfair Display', 
                fontWeight: 'bold', 
                color: 'white' 
              }}>Popular Dishes</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #fc4a1a',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Bariis Iskukaris</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Spiced Rice</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.75rem', 
                      background: 'linear-gradient(135deg, #fc4a1a, #f7b733)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>45 orders</p>
                    <p style={{ fontSize: '0.85rem', color: '#38ef7d', fontWeight: '600' }}>+8%</p>
                  </div>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #e17055',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Hilib Shiilan</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Grilled Meat</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.75rem', 
                      background: 'linear-gradient(135deg, #e17055, #d63031)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>32 orders</p>
                    <p style={{ fontSize: '0.85rem', color: '#38ef7d', fontWeight: '600' }}>+12%</p>
                  </div>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #fdcb6e',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Sambuus</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Samosas</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.75rem', 
                      background: 'linear-gradient(135deg, #fdcb6e, #f39c12)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>28 orders</p>
                    <p style={{ fontSize: '0.85rem', color: '#38ef7d', fontWeight: '600' }}>+5%</p>
                  </div>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: '4px solid #00b894',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Shaah Somali</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Traditional Tea</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.75rem', 
                      background: 'linear-gradient(135deg, #00b894, #00cec9)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>67 orders</p>
                    <p style={{ fontSize: '0.85rem', color: '#38ef7d', fontWeight: '600' }}>+15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          marginTop: '3rem',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea, #f093fb, #4facfe, #43e97b, #fcb69f)'
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              padding: '0.75rem',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
            }}>
              <MessageSquare style={{ width: '24px', height: '24px' }} />
            </div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontFamily: 'Playfair Display', 
              fontWeight: 'bold', 
              color: 'white' 
            }}>Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div 
              onClick={() => navigate('/admin/orders')}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                padding: '16px',
                borderRadius: '50%',
                width: '72px',
                height: '72px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
              }}>
                <Package style={{ width: '32px', height: '32px', color: 'white' }} />
              </div>
              <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: '16px' }}>View Orders</p>
              <p style={{ fontSize: '13px', opacity: '0.9', lineHeight: '1.4' }}>Manage customer orders</p>
            </div>

            <div 
              onClick={() => navigate('/admin/reservations')}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                padding: '16px',
                borderRadius: '50%',
                width: '72px',
                height: '72px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3)'
              }}>
                <Calendar style={{ width: '32px', height: '32px', color: 'white' }} />
              </div>
              <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: '16px' }}>Reservations</p>
              <p style={{ fontSize: '13px', opacity: '0.9', lineHeight: '1.4' }}>Handle table bookings</p>
            </div>

            <div 
              onClick={() => navigate('/admin/staff')}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                padding: '16px',
                borderRadius: '50%',
                width: '72px',
                height: '72px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(168, 237, 234, 0.3)'
              }}>
                <Users style={{ width: '32px', height: '32px', color: '#666' }} />
              </div>
              <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: '16px' }}>Manage Staff</p>
              <p style={{ fontSize: '13px', opacity: '0.9', lineHeight: '1.4' }}>Employee management</p>
            </div>

            <div 
              onClick={() => navigate('/admin/reviews')}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                padding: '16px',
                borderRadius: '50%',
                width: '72px',
                height: '72px',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(252, 182, 159, 0.3)'
              }}>
                <Star style={{ width: '32px', height: '32px', color: '#d97706' }} />
              </div>
              <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: '16px' }}>Reviews</p>
              <p style={{ fontSize: '13px', opacity: '0.9', lineHeight: '1.4' }}>Customer feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
