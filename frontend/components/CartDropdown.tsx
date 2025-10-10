'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, X, Trash2, ArrowRight, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPlans, removeFromCart, clearCart, totalPrice, totalItems } =
    useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button - Mobile Optimized */}
      <Button
        className="relative bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full px-3 sm:px-4 py-2 shadow-md hover:shadow-lg active:shadow-sm transition-all duration-200 group"
        onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCart className="h-5 w-5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
        <span className="hidden sm:inline ml-2 font-medium text-sm">Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-5 sm:w-5 flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </Button>

      {/* Backdrop & Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop - Enhanced for mobile */}
          <div
            className="fixed inset-0 z-40 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown/Modal - Fully Mobile Optimized */}
          <div className="fixed inset-x-0 bottom-0 z-50 md:absolute md:right-0 top-full md:inset-x-auto md:bottom-auto md:mt-3 md:w-96 w-full animate-in slide-in-from-bottom duration-300 md:slide-in-from-top-2 md:zoom-in-95">
            <Card className="border-0 md:border shadow-2xl rounded-t-3xl md:rounded-2xl overflow-hidden bg-white max-h-[90vh] md:max-h-[600px] flex flex-col">
              {/* Header - Mobile Enhanced */}
              <CardHeader className="pb-4 pt-5 px-5 flex-shrink-0 border-b bg-gradient-to-br from-slate-50 to-white">
                {/* Mobile Drag Handle */}
                <div className="md:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2.5 rounded-xl">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl font-bold text-slate-900">
                        Shopping Cart
                      </CardTitle>
                      {totalItems > 0 && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {totalItems} {totalItems === 1 ? 'item' : 'items'}{' '}
                          added
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-10 w-10 md:h-9 md:w-9 p-0 hover:bg-slate-100 rounded-xl transition-colors flex-shrink-0">
                    <X className="h-5 w-5 md:h-4 md:w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Content - Mobile Enhanced */}
              <CardContent className="flex-1 flex flex-col overflow-hidden p-4 md:p-5">
                {selectedPlans.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12 md:py-8 animate-in fade-in duration-500">
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-full p-8 mb-5 shadow-inner">
                      <ShoppingCart className="h-16 w-16 md:h-12 md:w-12 text-slate-400" />
                    </div>
                    <p className="text-lg md:text-base font-bold text-slate-800 mb-2">
                      Your cart is empty
                    </p>
                    <p className="text-base md:text-sm text-slate-500 max-w-xs px-4">
                      Browse our security plans and add them to get started
                    </p>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/packages');
                      }}
                      variant="outline"
                      className="mt-6 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl px-6">
                      <Package className="h-4 w-4 mr-2" />
                      Browse Packages
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items - Mobile Enhanced */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 -mr-2 overscroll-contain">
                      {selectedPlans.map((plan, index) => (
                        <div
                          key={index}
                          className="group relative flex items-start gap-3 p-4 md:p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg active:scale-98 transition-all animate-in slide-in-from-left duration-300"
                          style={{ animationDelay: `${index * 50}ms` }}>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-base md:text-sm text-slate-900 leading-tight mb-2">
                              {plan.planTitle}
                            </h4>
                            <p className="text-sm md:text-xs text-slate-600 mb-3">
                              {plan.numberOfEmployees} employees
                            </p>
                            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-lg shadow-sm">
                              <span className="text-base md:text-sm font-bold text-blue-600">
                                ${plan.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(index)}
                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 active:bg-red-100 h-10 w-10 md:h-9 md:w-9 p-0 rounded-xl transition-all duration-200 opacity-70 group-hover:opacity-100 flex-shrink-0">
                            <X className="h-5 w-5 md:h-4 md:w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Footer - Mobile Enhanced */}
                    <div className="border-t-2 pt-5 mt-5 flex-shrink-0 space-y-4">
                      {/* Total - Mobile Enhanced */}
                      <div className="flex justify-between items-center p-5 md:p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-inner">
                        <div>
                          <p className="text-xs text-slate-600 font-medium mb-1">
                            Total Amount
                          </p>
                          <p className="text-sm text-slate-500">
                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ${totalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons - Mobile Enhanced */}
                      <div className="space-y-3">
                        <Button
                          onClick={handleCheckout}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white h-14 md:h-12 rounded-2xl font-bold text-base md:text-sm shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 group">
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={clearCart}
                          className="w-full text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 active:bg-red-100 h-12 md:h-10 rounded-2xl transition-all duration-200 font-semibold">
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
