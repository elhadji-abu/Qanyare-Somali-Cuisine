import { Heart, Users, Leaf, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-darkbrown mb-4">About Qanyare</h1>
          <p className="text-lg text-gray-600">Preserving Somali culinary traditions in the heart of Mandera</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Traditional Somali Dining"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-playfair font-bold text-darkbrown mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Qanyare Somali Cuisine was founded in 2018 with a simple yet powerful mission: to bring authentic Somali 
              flavors to the people of Mandera and beyond.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, Hussein Qanyare Hussein, grew up in a family where food was the centerpiece of every gathering. 
              He learned traditional recipes from his grandmother and mother, carrying forward generations of 
              culinary wisdom. Today, every dish we serve is prepared with the same love and attention to detail 
              that has been passed down through our family.
            </p>
            <p className="text-gray-600">
              We believe that food is more than sustenance—it's a bridge that connects us to our heritage, 
              our community, and each other. At Qanyare, we're not just serving meals; we're preserving culture 
              and creating memories.
            </p>
          </div>
        </div>

        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-playfair font-bold text-darkbrown mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-darkbrown mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  Every recipe is true to traditional Somali cooking methods, using authentic spices and techniques 
                  passed down through generations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-darkbrown mb-2">Community</h3>
                <p className="text-gray-600">
                  We serve as a gathering place for the Somali community and welcome everyone to experience our 
                  warm hospitality.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-darkbrown mb-2">Quality</h3>
                <p className="text-gray-600">
                  We source the finest ingredients and prepare each dish with care, ensuring every meal meets our 
                  high standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-darkbrown mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To preserve and share the rich culinary heritage of Somali culture while creating a welcoming space where 
              people can gather, celebrate, and enjoy authentic traditional cuisine.
            </p>
            <p className="text-gray-600 mb-6">
              We are committed to using traditional cooking methods, supporting local suppliers, and maintaining 
              the highest standards of food safety and customer service.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-gray-600">Traditional Recipes</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Restaurant Interior"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
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
