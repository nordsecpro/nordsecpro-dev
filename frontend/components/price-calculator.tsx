// components/PriceCalculator.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useRouter } from 'next/navigation';
import { X, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const pricingData = {
  basicSecurity: [
    { min: 5, max: 25, price: 1700 },
    { min: 26, max: 50, price: 2200 },
    { min: 51, max: 100, price: 2800 },
    { min: 101, max: 250, price: 3500 },
  ],
  soc2Readiness: [
    { min: 5, max: 25, price: 4200 },
    { min: 26, max: 50, price: 6000 },
    { min: 51, max: 150, price: 7200 },
    { min: 151, max: 250, price: 8500 },
  ],
  readyForAudit: [
    { min: 5, max: 25, price: 4800 },
    { min: 26, max: 50, price: 5600 },
    { min: 51, max: 100, price: 8000 },
    { min: 101, max: 200, price: 10000 },
    { min: 201, max: 250, price: 12000 },
  ],
  vCISOplus: [
    { min: 5, max: 20, price: 2800 },
    { min: 21, max: 50, price: 3200 },
    { min: 51, max: 150, price: 4800 },
    { min: 151, max: 250, price: 6000 },
  ],
};

function findPrice(arr: any[], employees: number) {
  return (
    arr.find((range) => employees >= range.min && employees <= range.max)
      ?.price || arr[arr.length - 1].price
  );
}

export default function PriceCalculator() {
  const [employees, setEmployees] = useState([25]);
  const {
    selectedPlans,
    addToCart,
    removeFromCart,
    clearCart,
    isPlanSelected,
    totalPrice,
    totalItems
  } = useCart();
  const router = useRouter();

  const basicPrice = findPrice(pricingData.basicSecurity, employees[0]);
  const soc2Price = findPrice(pricingData.soc2Readiness, employees[0]);
  const auditPrice = findPrice(pricingData.readyForAudit, employees[0]);
  const vcisoPrice = findPrice(pricingData.vCISOplus, employees[0]);

  function handleAddToCart(title: string, employeeCount: number, price: number) {
    const planData = {
      planTitle: title,
      numberOfEmployees: employeeCount,
      price: price,
      timestamp: Date.now()
    };

    addToCart(planData);
  }

  function handleProceedToCheckout() {
    if (totalItems === 0) return;
    router.push('/checkout');
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Calculate Your Security Investment
        </h3>
        <p className="text-gray-600">
          Get personalized pricing for all our services based on your company size
        </p>
      </div>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Selected Plans ({totalItems})
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            {selectedPlans.map((plan, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                <div>
                  <span className="font-medium">{plan.planTitle}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({plan.numberOfEmployees} employees)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">${plan.price.toLocaleString()}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(index)}
                    className="text-red-600 hover:bg-red-50 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-900">
              Total: ${totalPrice.toLocaleString()}
            </div>
            <Button
              onClick={handleProceedToCheckout}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Number of Employees:{' '}
          <span className="font-bold text-blue-600">{employees[0]}</span>
        </label>
        <Slider
          value={employees}
          onValueChange={setEmployees}
          max={250}
          min={5}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>5</span>
          <span>250+</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors h-full flex flex-col">
          <CardHeader className="text-center pb-4 flex-grow">
            <CardTitle className="text-lg min-h-[3rem] flex items-center justify-center">
              Startup Security Launchpad
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ${basicPrice.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mb-4">One-time retainer</p>
            {isPlanSelected('Startup Security Launchpad') ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Added to Cart
              </Button>
            ) : (
              <Button
                className="w-full bg-gray-600 hover:bg-gray-700"
                onClick={() =>
                  handleAddToCart('Startup Security Launchpad', employees[0], basicPrice)
                }
              >
                Add to Cart
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500 bg-blue-50 hover:border-blue-600 transition-colors h-full flex flex-col">
          <CardHeader className="text-center pb-4 flex-grow">
            <div className="inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold mb-2">
              Most Popular
            </div>
            <CardTitle className="text-lg min-h-[3rem] flex items-center justify-center">
              SOC 2 Pre-Audit Blueprint
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2">
              ${soc2Price.toLocaleString()}
            </div>
            <p className="text-sm text-blue-700 mb-4">One-time retainer</p>
            {isPlanSelected('SOC 2 Pre-Audit Blueprint') ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Added to Cart
              </Button>
            ) : (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() =>
                  handleAddToCart('SOC 2 Pre-Audit Blueprint', employees[0], soc2Price)
                }
              >
                Add to Cart
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500 bg-green-50 hover:border-green-600 transition-colors h-full flex flex-col">
          <CardHeader className="text-center pb-4 flex-grow">
            <CardTitle className="text-lg min-h-[3rem] flex items-center justify-center">
              Audit Check: Final Review
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-900 mb-2">
              ${auditPrice.toLocaleString()}
            </div>
            <p className="text-sm text-green-700 mb-4">One-time retainer</p>
            {isPlanSelected('Audit Check: Final Review') ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Added to Cart
              </Button>
            ) : (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() =>
                  handleAddToCart('Audit Check: Final Review', employees[0], auditPrice)
                }
              >
                Add to Cart
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-500 bg-purple-50 hover:border-purple-600 transition-colors h-full flex flex-col">
          <CardHeader className="text-center pb-4 flex-grow">
            <CardTitle className="text-lg min-h-[3rem] flex items-center justify-center">
              vCISO On-Demand
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-900 mb-2">
              ${vcisoPrice.toLocaleString()}
            </div>
            <p className="text-sm text-purple-700 mb-4">Ongoing engagement</p>
            {isPlanSelected('vCISO On-Demand') ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Added to Cart
              </Button>
            ) : (
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() =>
                  handleAddToCart('vCISO On-Demand', employees[0], vcisoPrice)
                }
              >
                Add to Cart
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Prices shown are estimates. Final pricing may vary based on specific requirements.
        </p>
      </div>
    </div>
  );
}