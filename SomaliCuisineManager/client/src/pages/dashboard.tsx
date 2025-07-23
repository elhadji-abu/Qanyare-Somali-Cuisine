import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, ShoppingBag, Calendar, MessageSquare, Clock, CheckCircle } from 'lucide-react';

interface Order {
  id: number;
  customerName: string;
  items: string;
  total: number;
  status: string;
  createdAt: string;
}

interface Reservation {
  id: number;
  customerName: string;
  date: string;
  time: string;
  partySize: number;
  tableType: string;
  status: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ['/api/orders', { customer: user?.name }],
    queryFn: async () => {
      const response = await fetch(`/api/orders?customerName=${encodeURIComponent(user?.name || '')}`);
      return response.json();
    },
    enabled: !!user,
  });

  const { data: reservations = [] } = useQuery<Reservation[]>({
    queryKey: ['/api/reservations', { customer: user?.name }],
    queryFn: async () => {
      const response = await fetch(`/api/reservations?customerName=${encodeURIComponent(user?.name || '')}`);
      return response.json();
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-playfair text-darkbrown">Please log in to view your dashboard</h1>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="relative">
            <div className="absolute -top-2 -left-4 w-16 h-16 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-20"></div>
            <h1 className="text-4xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600 relative z-10">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-700 mt-3 text-lg">Manage your culinary journey with us</p>
          </div>
          <div
            onClick={logout}
            style={{
              backgroundColor: 'white',
              color: '#8B4513',
              border: '2px solid #D2691E',
              borderRadius: '12px',
              padding: '12px 24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(210, 105, 30, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D2691E';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#8B4513';
            }}
          >
            <User className="w-5 h-5" />
            Logout
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{orders.length}</p>
                <p className="text-orange-100 mt-1 text-lg">Total Orders</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <ShoppingBag className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-4 bg-white/10 rounded-lg p-2 text-center">
              <p className="text-sm font-medium">Your culinary adventures</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{reservations.length}</p>
                <p className="text-blue-100 mt-1 text-lg">Reservations</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-4 bg-white/10 rounded-lg p-2 text-center">
              <p className="text-sm font-medium">Dining experiences planned</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {orders.filter(order => order.status.toLowerCase() === 'completed').length}
                </p>
                <p className="text-green-100 mt-1 text-lg">Completed Orders</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-4 bg-white/10 rounded-lg p-2 text-center">
              <p className="text-sm font-medium">Successfully delivered</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-playfair font-bold text-gray-800">Recent Orders</h2>
            </div>
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order, index) => (
                  <div key={order.id} className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-6 mb-4 border-l-4 border-orange-400 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="font-bold text-gray-800 text-lg">Order #{order.id}</p>
                        </div>
                        <p className="text-gray-700 mt-2 font-medium">
                          {(() => {
                            try {
                              const items = JSON.parse(order.items);
                              return items.map((item: any, idx: number) => 
                                `${item.name} (x${item.quantity})`
                              ).join(', ');
                            } catch {
                              return order.items;
                            }
                          })()}
                        </p>
                        <div className="flex items-center text-gray-500 mt-3">
                          <Clock className="w-4 h-4 mr-2" />
                          <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-2xl text-orange-600 mb-2">KES {order.total}</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-12 h-12 text-orange-500" />
                  </div>
                  <p className="text-gray-700 text-lg font-semibold mb-2">No orders yet</p>
                  <p className="text-gray-500">Start by exploring our authentic Somali dishes!</p>
                </div>
              )}
            </div>
          </div>

          {/* Reservations */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-playfair font-bold text-gray-800">Reservations</h2>
            </div>
            <div className="space-y-4">
              {reservations.length > 0 ? (
                reservations.slice(0, 5).map((reservation, index) => (
                  <div key={reservation.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-4 border-l-4 border-blue-400 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="font-bold text-gray-800 text-lg">Reservation #{reservation.id}</p>
                        </div>
                        <p className="text-gray-700 mt-2 font-medium">
                          📅 {new Date(reservation.date).toLocaleDateString()} at {reservation.time}
                        </p>
                        <p className="text-gray-600 mt-2">
                          👥 {reservation.partySize} guests • 🪑 {reservation.tableType}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-12 h-12 text-blue-500" />
                  </div>
                  <p className="text-gray-700 text-lg font-semibold mb-2">No reservations yet</p>
                  <p className="text-gray-500">Reserve a table for an unforgettable dining experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-playfair font-bold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/menu')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="bg-white/20 p-4 rounded-full">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold mb-1">Browse Menu</p>
                <p className="text-sm opacity-80">Discover authentic Somali cuisine</p>
              </div>
            </div>

            <div
              onClick={() => navigate('/reservations')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="bg-white/20 p-4 rounded-full">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold mb-1">Make Reservation</p>
                <p className="text-sm opacity-80">Reserve your table today</p>
              </div>
            </div>

            <div
              onClick={() => navigate('/reviews')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="bg-white/20 p-4 rounded-full">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold mb-1">Leave Review</p>
                <p className="text-sm opacity-80">Share your experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}