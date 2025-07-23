import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Star, StarIcon, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest } from '@/lib/queryClient';
import { Review } from '@shared/schema';

export default function Reviews() {
  const [formData, setFormData] = useState({
    customerName: '',
    rating: '',
    comment: '',
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews', { approved: true }],
    queryFn: async () => {
      const response = await fetch('/api/reviews?approved=true');
      return response.json();
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      const response = await apiRequest('POST', '/api/reviews', reviewData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Review submitted successfully!",
        description: "Your review is pending approval and will be visible soon.",
      });
      setFormData({
        customerName: '',
        rating: '',
        comment: '',
      });
    },
    onError: () => {
      toast({
        title: "Review submission failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.rating || !formData.comment) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate({
      ...formData,
      rating: parseInt(formData.rating),
      isApproved: false,
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Auto-fill user data if logged in
  if (user && !formData.customerName) {
    setFormData(prev => ({ ...prev, customerName: user.name }));
  }

  return (
    <div className="min-h-screen bg-neutral py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Customer Reviews</h1>
          <p className="text-lg text-gray-600">What our valued customers say about their dining experience</p>
        </div>

        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-playfair font-semibold text-darkbrown">{review.customerName}</h4>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{review.comment}"</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(review.createdAt!).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Review Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-darkbrown text-center">
              Share Your Experience
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Your Name</Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Ahmed Hassan"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select value={formData.rating} onValueChange={(value) => handleInputChange('rating', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars - Excellent</SelectItem>
                      <SelectItem value="4">4 Stars - Very Good</SelectItem>
                      <SelectItem value="3">3 Stars - Good</SelectItem>
                      <SelectItem value="2">2 Stars - Fair</SelectItem>
                      <SelectItem value="1">1 Star - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  placeholder="Tell us about your experience..."
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  rows={4}
                  required
                />
              </div>
              
              {/* Submit Button Section */}
              <div className="bg-gray-100 p-6 mt-6 rounded-lg border border-gray-300">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                  disabled={createReviewMutation.isPending}
                >
                  {createReviewMutation.isPending ? 'SUBMITTING REVIEW...' : 'SUBMIT REVIEW'}
                </button>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Your review will be published after approval
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
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
