import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Package, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminNav from '@/components/layout/admin-nav';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Order } from '@shared/schema';

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest('PATCH', `/api/orders/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "Order updated successfully",
        description: "The order status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was an error updating the order status.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-white';
      case 'preparing':
        return 'bg-primary text-white';
      case 'ready':
        return 'bg-success text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      case 'cancelled':
        return 'bg-error text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'preparing':
        return <Package className="w-4 h-4" />;
      case 'ready':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '32px'
        }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 style={{ 
                fontSize: '36px', 
                fontWeight: '700', 
                color: 'white', 
                fontFamily: 'Playfair Display',
                marginBottom: '8px'
              }}>
                Orders Management
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                Manage and track all customer orders
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid #f3f4f6'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
              borderRadius: '12px',
              padding: '12px',
              marginRight: '16px'
            }}>
              <Package style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#1f2937',
              fontFamily: 'Playfair Display'
            }}>
              Recent Orders ({filteredOrders.length})
            </h2>
          </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <tr className="text-left">
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Order ID</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Customer</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Items</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Total</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Status</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Date</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const orderItems = JSON.parse(order.items || '[]');
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm">#{order.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            {order.customerPhone && (
                              <p className="text-sm text-gray-500">{order.customerPhone}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="max-w-xs">
                            {orderItems.slice(0, 2).map((item: any, index: number) => (
                              <p key={index} className="text-sm">
                                {item.quantity}x {item.name}
                              </p>
                            ))}
                            {orderItems.length > 2 && (
                              <p className="text-xs text-gray-500">+{orderItems.length - 2} more</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-primary">KES {order.total}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${getStatusColor(order.status)} flex items-center w-fit`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt!).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Select
                              value={order.status}
                              onValueChange={(newStatus) => 
                                updateOrderMutation.mutate({ id: order.id, status: newStatus })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
