'use client';

import { Card } from '@/components/ui/card';

export function MarketStats() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Market Stats</h3>
      <div className="grid gap-4">
        <div className="grid grid-cols-2">
          <div className="text-sm text-muted-foreground">24h High</div>
          <div className="text-sm font-medium text-right">$46,250.00</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-sm text-muted-foreground">24h Low</div>
          <div className="text-sm font-medium text-right">$44,800.00</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-sm text-muted-foreground">24h Volume</div>
          <div className="text-sm font-medium text-right">1,234.56 BTC</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-sm text-muted-foreground">24h Change</div>
          <div className="text-sm font-medium text-right text-green-500">
            +2.5%
          </div>
        </div>
      </div>
    </Card>
  );
}