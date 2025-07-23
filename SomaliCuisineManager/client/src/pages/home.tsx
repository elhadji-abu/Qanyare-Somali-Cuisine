import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Coffee, UtensilsCrossed, Beef, Plus, StarIcon, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest } from '@/lib/queryClient';
import { MenuItem, Category, Review } from '@shared/schema';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [reviewFormData, setReviewFormData] = useState({
    customerName: '',
    rating: '',
    comment: '',
  });

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: menuItems = [], isLoading: itemsLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu-items'],
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<Review[]>({
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
      setReviewFormData({
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

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.categoryId === parseInt(selectedCategory));

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn,
      nameSo: item.nameSo,
      price: item.price,
      image: item.image || undefined,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewFormData.customerName || !reviewFormData.rating || !reviewFormData.comment) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate({
      ...reviewFormData,
      rating: parseInt(reviewFormData.rating),
      isApproved: false,
    });
  };

  const handleReviewInputChange = (name: string, value: string) => {
    setReviewFormData(prev => ({ ...prev, [name]: value }));
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
  if (user && !reviewFormData.customerName) {
    setReviewFormData(prev => ({ ...prev, customerName: user.name }));
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center hero-bg">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">Welcome to Qanyare</h1>
          <p className="text-xl md:text-2xl mb-8 font-dancing">Authentic Somali Cuisine in the Heart of Mandera</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the rich flavors and warm hospitality of Somali culture. From traditional Bariis to succulent Hilib, 
            every dish tells a story of our heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 flex items-center justify-center"
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
            >
              <span className="flex items-center gap-2 justify-center" style={{ textAlign: 'center' }}>
                <UtensilsCrossed className="w-6 h-6" />
                Explore Menu
              </span>
            </Button>
            <Link href="/reservations">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-3 border-white text-white hover:bg-orange-600 hover:text-white font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/10 flex items-center justify-center"
                style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              >
                <span className="flex items-center gap-2 justify-center" style={{ textAlign: 'center' }}>
                  <Phone className="w-6 h-6" />
                  Make Reservation
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Our Specialties</h2>
            <p className="text-lg text-gray-600">Discover the authentic flavors of Somali cuisine</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-neutral hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-darkbrown mb-2">Cabitaan (Drinks)</h3>
                <p className="text-gray-600">Traditional Somali teas and refreshing beverages</p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <UtensilsCrossed className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-darkbrown mb-2">Bilowga (Starters)</h3>
                <p className="text-gray-600">Delicious appetizers to begin your meal</p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Beef className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-darkbrown mb-2">Cunto Weyn (Main Course)</h3>
                <p className="text-gray-600">Hearty traditional dishes that satisfy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu-section" className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Our Menu</h2>
            <p className="text-lg text-gray-600">Authentic Somali dishes prepared with love and tradition</p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-primary text-white' : ''}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id.toString() ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={selectedCategory === category.id.toString() ? 'bg-primary text-white' : ''}
              >
                {category.nameSo} ({category.nameEn})
              </Button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {categoriesLoading || itemsLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading menu...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                const category = categories.find(c => c.id === item.categoryId);
                
                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {item.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.nameEn}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-playfair font-semibold text-darkbrown">{item.nameEn}</h3>
                          <p className="text-sm text-gray-600 font-dancing">{item.nameSo}</p>
                        </div>
                        {category && (
                          <Badge variant="secondary" className="text-xs">
                            {category.nameSo}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">KES {item.price}</span>
                        <div
                          onClick={() => handleAddToCart(item)}
                          style={{
                            backgroundColor: item.isAvailable ? '#2563eb' : '#9ca3af',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            cursor: item.isAvailable ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            outline: 'none',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            userSelect: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (item.isAvailable) {
                              e.currentTarget.style.backgroundColor = '#1d4ed8';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (item.isAvailable) {
                              e.currentTarget.style.backgroundColor = '#2563eb';
                            }
                          }}
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {filteredItems.length === 0 && !categoriesLoading && !itemsLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Customer Reviews</h2>
            <p className="text-lg text-gray-600">What our valued customers say about their dining experience</p>
          </div>

          {reviewsLoading ? (
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
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Your Name</Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Ahmed Hassan"
                      value={reviewFormData.customerName}
                      onChange={(e) => handleReviewInputChange('customerName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select value={reviewFormData.rating} onValueChange={(value) => handleReviewInputChange('rating', value)}>
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
                    value={reviewFormData.comment}
                    onChange={(e) => handleReviewInputChange('comment', e.target.value)}
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
                    {createReviewMutation.isPending ? 'SUBMITTING REVIEW...' : 'SHARE YOUR EXPERIENCE'}
                  </button>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Your review helps us improve our service
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

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
