import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, Clock, Users, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest } from '@/lib/queryClient';
import { Table } from '@shared/schema';

export default function Reservations() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    date: '',
    time: '',
    guests: '',
    eventType: '',
    tableId: '',
    notes: '',
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tables = [] } = useQuery<Table[]>({
    queryKey: ['/api/tables'],
  });

  const createReservationMutation = useMutation({
    mutationFn: async (reservationData: any) => {
      const response = await apiRequest('POST', '/api/reservations', reservationData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reservations'] });
      toast({
        title: "Reservation submitted successfully!",
        description: "We will contact you soon to confirm your reservation.",
      });
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        date: '',
        time: '',
        guests: '',
        eventType: '',
        tableId: '',
        notes: '',
      });
    },
    onError: () => {
      toast({
        title: "Reservation failed",
        description: "There was an error submitting your reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone || !formData.date || !formData.time || !formData.guests || !formData.eventType || !formData.tableId) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createReservationMutation.mutate({
      ...formData,
      guests: parseInt(formData.guests),
      status: 'pending',
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Auto-fill user data if logged in
  if (user && !formData.customerName) {
    setFormData(prev => ({
      ...prev,
      customerName: user.name,
      customerPhone: user.phone || '',
      customerEmail: user.email || '',
    }));
  }

  return (
    <div className="min-h-screen bg-neutral py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Make a Reservation</h1>
          <p className="text-lg text-gray-600">Reserve your table for special occasions and cultural celebrations</p>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-darkbrown">Reservation Details</CardTitle>
          </CardHeader>
          
          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Ahmed Hassan Mohamed"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="ahmed@example.com"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="13:00">1:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5 Guests</SelectItem>
                      <SelectItem value="6">6 Guests</SelectItem>
                      <SelectItem value="8">8 Guests</SelectItem>
                      <SelectItem value="10">10+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Dining</SelectItem>
                      <SelectItem value="aroos">Aroos (Wedding)</SelectItem>
                      <SelectItem value="dabbaaldeg">Dabbaaldeg (Celebration)</SelectItem>
                      <SelectItem value="business">Business Meeting</SelectItem>
                      <SelectItem value="family">Family Gathering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tableId">Table/Hall Preference *</Label>
                <Select value={formData.tableId} onValueChange={(value) => handleInputChange('tableId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Table/Hall" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map((table) => (
                      <SelectItem key={table.id} value={table.id.toString()}>
                        {table.name} ({table.capacity} persons) - {table.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special dietary requirements or requests..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Submit Button Section - Force Render */}
              <div className="w-full bg-gray-100 p-8 mt-8 rounded-lg border border-gray-300">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 flex items-center justify-center"
                  disabled={createReservationMutation.isPending}
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  {createReservationMutation.isPending ? 'SUBMITTING...' : 'SUBMIT RESERVATION'}
                </button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  We'll contact you within 24 hours to confirm your reservation
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-playfair font-bold mb-4 text-white">Qanyare Somali Cuisine</h3>
              <p className="text-gray-200 mb-4 leading-relaxed">
                Experience authentic Somali flavors in the heart of Mandera. Our restaurant brings together traditional recipes 
                and warm hospitality to create unforgettable dining experiences.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-playfair font-semibold mb-4 text-white">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-200">Mandera Town, Kenya</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-200">+254 700 123456</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-200">info@qanyare.co.ke</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-lg font-playfair font-semibold mb-4 text-white">Opening Hours</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-200">
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-sm text-gray-300">7:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-200">
                    <p className="font-medium">Saturday - Sunday</p>
                    <p className="text-sm text-gray-300">8:00 AM - 12:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-200">
              © 2025 Qanyare Somali Cuisine. All rights reserved. Made with ❤️ in Mandera, Kenya.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
