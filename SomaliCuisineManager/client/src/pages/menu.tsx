import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { MenuItem, Category } from '@shared/schema';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: menuItems = [], isLoading: itemsLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu-items'],
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

  if (categoriesLoading || itemsLoading) {
    return (
      <div className="min-h-screen bg-neutral py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Our Menu</h1>
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
        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredItems.map((item) => {
            const category = categories.find(c => c.id === item.categoryId);
            
            return (
              <div key={item.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                padding: '24px',
                display: 'block',
                height: 'auto',
                overflow: 'visible',
                position: 'relative'
              }}>

                
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.nameEn}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}
                  />
                )}
                
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#8B4513', marginBottom: '8px' }}>
                  {item.nameEn}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  {item.nameSo}
                </p>
                
                <p style={{ color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>
                  {item.description}
                </p>
                
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#D2691E', marginBottom: '16px' }}>
                  KES {item.price}
                </div>
                
                <div
                  onClick={() => handleAddToCart(item)}
                  style={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: 'none',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  ADD TO CART
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No items found in this category.</p>
          </div>
        )}
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
