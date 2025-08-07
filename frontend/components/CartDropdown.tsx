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

  // Prevent body scroll when dropdown is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 relative px-3 py-2"
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
        <>
          {/* Mobile overlay backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />
          
          {/* Dropdown/Modal */}
          <div className="
            fixed inset-x-0 bottom-0 z-50 
            md:absolute md:right-0 md:top-full md:inset-x-auto md:bottom-auto
            md:mt-2 md:w-96
            w-full max-h-[85vh] md:max-h-none
            bg-white rounded-t-xl md:rounded-lg 
            shadow-lg border md:border
            border-t md:border-t
          ">
            <Card className="border-0 shadow-none h-full flex flex-col">
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Shopping Cart</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                {selectedPlans.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 flex-1 flex flex-col justify-center">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="text-base">Your cart is empty</p>
                    <p className="text-sm mt-1">Add some security plans to get started</p>
                  </div>
                ) : (
                  <>
                    <div className="
                      space-y-3 flex-1 overflow-y-auto
                      max-h-48 md:max-h-64
                      pr-2 -mr-2
                    ">
                      {selectedPlans.map((plan, index) => (
                        <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight truncate pr-2">
                              {plan.planTitle}
                            </h4>
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
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 ml-2 flex-shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 mt-4 flex-shrink-0">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-base">Total:</span>
                        <span className="text-xl md:text-lg font-bold text-blue-600">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          onClick={handleCheckout}
                          className="w-full bg-blue-600 hover:bg-blue-700 h-12 md:h-auto text-base md:text-sm"
                        >
                          Proceed to Checkout
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={clearCart}
                          className="w-full text-red-600 border-red-300 hover:bg-red-50 h-10 md:h-auto"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}