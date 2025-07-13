// contexts/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PlanData {
  planTitle: string;
  numberOfEmployees: number;
  price: number;
  timestamp: number;
}

interface CartContextType {
  selectedPlans: PlanData[];
  addToCart: (plan: PlanData) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  isPlanSelected: (title: string) => boolean;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [selectedPlans, setSelectedPlans] = useState<PlanData[]>(() => {
    if (typeof window !== 'undefined') {
      const savedPlans = localStorage.getItem('selectedPlans');
      if (savedPlans) {
        try {
          return JSON.parse(savedPlans);
        } catch (error) {
          console.error('Error loading saved plans:', error);
        }
      }
    }
    return [];
  });

  // Load selected plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('selectedPlans');
    if (savedPlans) {
      try {
        const plans = JSON.parse(savedPlans);
        setSelectedPlans(plans);
      } catch (error) {
        console.error('Error loading saved plans:', error);
      }
    }
  }, []);

  // Save to localStorage whenever selectedPlans changes
  useEffect(() => {
    localStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }, [selectedPlans]);

  const addToCart = (plan: PlanData) => {
    setSelectedPlans(prev => [...prev, plan]);
  };

  const removeFromCart = (index: number) => {
    setSelectedPlans(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setSelectedPlans([]);
  };

  const isPlanSelected = (title: string): boolean => {
    return selectedPlans.some(plan => plan.planTitle === title);
  };

  const totalPrice = selectedPlans.reduce((sum, plan) => sum + plan.price, 0);
  const totalItems = selectedPlans.length;

  return (
    <CartContext.Provider value={{
      selectedPlans,
      addToCart,
      removeFromCart,
      clearCart,
      isPlanSelected,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}