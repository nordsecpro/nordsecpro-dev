// components/CartDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPlans, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-4 w-4" />
        <span className="hidden sm:inline">Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-50">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Shopping Cart</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedPlans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add some security plans to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedPlans.map((plan, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight">{plan.planTitle}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {plan.numberOfEmployees} employees
                          </p>
                          <p className="text-sm font-semibold text-blue-600 mt-1">
                            ${plan.price.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0 ml-2"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Total:</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Proceed to Checkout
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={clearCart}
                        className="w-full text-red-600 border-red-300 hover:bg-red-50"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}