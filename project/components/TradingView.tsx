'use client';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function TradingView() {
  const [price, setPrice] = useState('45000');
  const [amount, setAmount] = useState('');

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-4">
        <Select defaultValue="BTCUSDT">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select pair" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTCUSDT">BTC/USDT</SelectItem>
            <SelectItem value="ETHUSDT">ETH/USDT</SelectItem>
            <SelectItem value="BNBUSDT">BNB/USDT</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-500">$45,000.00</div>
          <div className="text-sm text-muted-foreground">+2.5%</div>
        </div>
      </div>

      <Tabs defaultValue="limit" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="stop">Stop-Limit</TabsTrigger>
        </TabsList>
        <TabsContent value="limit">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Buy BTC
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Sell BTC
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="market">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input type="text" placeholder="0.00" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Buy BTC
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Sell BTC
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}