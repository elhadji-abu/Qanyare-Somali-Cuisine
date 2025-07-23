import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminNav from '@/components/layout/admin-nav';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Reservation } from '@shared/schema';

export default function AdminReservations() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ['/api/reservations'],
  });

  const updateReservationMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest('PATCH', `/api/reservations/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reservations'] });
      toast({
        title: "Reservation updated successfully",
        description: "The reservation status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was an error updating the reservation status.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-white';
      case 'confirmed':
        return 'bg-success text-white';
      case 'cancelled':
        return 'bg-error text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getEventTypeLabel = (eventType: string) => {
    const eventTypes: { [key: string]: string } = {
      regular: 'Regular Dining',
      aroos: 'Aroos (Wedding)',
      dabbaaldeg: 'Dabbaaldeg (Celebration)',
      business: 'Business Meeting',
      family: 'Family Gathering',
    };
    return eventTypes[eventType] || eventType;
  };

  const filteredReservations = statusFilter === 'all' 
    ? reservations 
    : reservations.filter(reservation => reservation.status === statusFilter);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' }}>
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white">Loading reservations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' }}>
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
                Reservations Management
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                Manage and track all table and hall reservations
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
                  <SelectItem value="all">All Reservations</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
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
              background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
              borderRadius: '12px',
              padding: '12px',
              marginRight: '16px'
            }}>
              <Calendar style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#1f2937',
              fontFamily: 'Playfair Display'
            }}>
              Reservations ({filteredReservations.length})
            </h2>
          </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Date & Time</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Guests</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Event Type</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Table/Hall</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm">#{reservation.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{reservation.customerName}</p>
                          <p className="text-sm text-gray-500">{reservation.customerPhone}</p>
                          {reservation.customerEmail && (
                            <p className="text-sm text-gray-500">{reservation.customerEmail}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{reservation.date}</p>
                          <p className="text-sm text-gray-500">{reservation.time}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-gray-500" />
                          <span>{reservation.guests}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm">{getEventTypeLabel(reservation.eventType)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm">{reservation.tableId}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getStatusColor(reservation.status)} flex items-center w-fit`}>
                          {getStatusIcon(reservation.status)}
                          <span className="ml-1 capitalize">{reservation.status}</span>
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Select
                          value={reservation.status}
                          onValueChange={(newStatus) => 
                            updateReservationMutation.mutate({ id: reservation.id, status: newStatus })
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredReservations.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No reservations found</p>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
