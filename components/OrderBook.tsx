'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function OrderBook() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Order Book</h3>
      <div className="grid grid-cols-3 text-sm font-medium mb-2">
        <div>Price</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-1">
          {/* Sell orders */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`sell-${i}`}
              className="grid grid-cols-3 text-sm text-red-500"
            >
              <div>44,{900 - i * 10}.00</div>
              <div className="text-right">0.0{5 + i}</div>
              <div className="text-right">2,245.00</div>
            </div>
          ))}
          <div className="py-2 text-center text-xl font-bold text-primary">
            45,000.00
          </div>
          {/* Buy orders */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`buy-${i}`}
              className="grid grid-cols-3 text-sm text-green-500"
            >
              <div>45,{100 + i * 10}.00</div>
              <div className="text-right">0.0{5 + i}</div>
              <div className="text-right">2,255.00</div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}