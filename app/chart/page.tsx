import { Header } from "@/components/Header";
import { MarketStats } from "@/components/MarketStats";
import { OrderBook } from "@/components/OrderBook";
import { TradingView } from "@/components/TradingView";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TradingView />
          </div>
          <div>
            <div className="space-y-4">
              <OrderBook />
              <MarketStats />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
