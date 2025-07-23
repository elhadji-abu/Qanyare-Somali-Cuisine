import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "We will get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-darkbrown mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We'd love to hear from you. Get in touch with us!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-darkbrown">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkbrown mb-1">Address</h4>
                    <p className="text-gray-600">
                      Mandera Town, Mandera County<br />
                      Kenya, East Africa
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkbrown mb-1">Phone</h4>
                    <p className="text-gray-600">
                      +254 712 345 678<br />
                      +254 733 456 789
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkbrown mb-1">Email</h4>
                    <p className="text-gray-600">
                      info@qanyarerestaurant.com<br />
                      reservations@qanyarerestaurant.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-darkbrown mb-1">Opening Hours</h4>
                    <p className="text-gray-600">
                      Monday - Sunday: 11:00 AM - 10:00 PM<br />
                      Friday: 12:00 PM - 10:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps - Mandera Town Center */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-playfair text-darkbrown flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31765.75159!2d41.85!3d3.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17f4b2d40e7f2e27%3A0x6c2d2c4d3e7f7f7f!2sMandera%2C%20Kenya!5e0!3m2!1sen!2ske!4v1644567890123!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Qanyare Somali Cuisine - Mandera Town, Kenya"
                  ></iframe>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Located in the heart of Mandera Town Center, Kenya
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-darkbrown">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ahmed Hassan Mohamed"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ahmed@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 712 345 678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reservation">Reservation Inquiry</SelectItem>
                        <SelectItem value="catering">Catering Services</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  
                  {/* Submit Button Section */}
                  <div className="bg-gray-100 p-6 mt-6 rounded-lg border border-gray-300">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      <Send className="w-5 h-5 mr-3" />
                      {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                    </button>
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      We'll respond to your message within 24 hours
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-playfair font-bold text-darkbrown mb-4">Visit Qanyare Today</h2>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                Located in the heart of Mandera, our restaurant offers an authentic Somali dining experience 
                with traditional architecture and warm hospitality. Whether you're planning a family dinner, 
                business meeting, or special celebration, we're here to make your experience memorable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-darkbrown mb-1">Call for Reservations</h3>
                  <p className="text-gray-600">+254 712 345 678</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-darkbrown mb-1">Email Us</h3>
                  <p className="text-gray-600">info@qanyarerestaurant.com</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-darkbrown mb-1">Visit Us</h3>
                  <p className="text-gray-600">Mandera Town, Kenya</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
