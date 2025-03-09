import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const route = useRouter();
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          India's Most Trusted Bitcoin Exchange
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Buy, Sell & Trade Bitcoin and other cryptocurrencies with ease
        </p>
        <Button
          size="lg"
          className="bg-wazirx-yellow text-black hover:bg-wazirx-blue hover:text-white"
          onClick={() => {
            route.push("/dashboard");
          }}
        >
          Start Trading Now
        </Button>
      </div>
    </section>
  );
}
