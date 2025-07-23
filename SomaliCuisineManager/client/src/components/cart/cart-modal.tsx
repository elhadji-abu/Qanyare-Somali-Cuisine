import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      clearCart();
      onClose();
      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      });
    },
    onError: () => {
      toast({
        title: "Order failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      customerName: user?.name || 'Guest Customer',
      customerPhone: user?.phone || '',
      customerEmail: user?.email || '',
      items: JSON.stringify(cart.map(item => ({
        id: item.id,
        name: item.nameEn,
        nameSo: item.nameSo,
        price: item.price,
        quantity: item.quantity,
      }))),
      total: getTotalPrice(),
      status: 'pending',
      notes: '',
    };

    createOrderMutation.mutate(orderData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl border-0 bg-white">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-2xl font-playfair text-darkbrown">Shopping Cart</CardTitle>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some delicious items from our menu!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={item.id} className={`p-4 ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-start space-x-4">
                      {item.image && (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.nameEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-darkbrown text-lg">{item.nameEn}</h4>
                        <p className="text-sm text-gray-600 font-dancing">{item.nameSo}</p>
                        <p className="text-primary font-bold mt-1">KES {item.price}</p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-50 rounded-lg border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-3 w-3 text-gray-600" />
                          </button>
                          
                          <span className="px-4 py-2 font-medium text-darkbrown min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-3 w-3 text-gray-600" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total & Actions */}
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-darkbrown">Total:</span>
                  <span className="text-3xl font-bold text-primary">KES {getTotalPrice()}</span>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={handleCheckout}
                    disabled={createOrderMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {createOrderMutation.isPending ? 'Processing Order...' : 'Place Order'}
                  </button>
                  
                  <button 
                    onClick={clearCart}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
