import { Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Your funds are protected by industry-leading security protocols.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Trades",
    description:
      "Execute trades quickly with our high-performance trading engine.",
  },
  {
    icon: Users,
    title: "10M+ Users",
    description:
      "Join our growing community of over 10 million traders worldwide.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-wazirx-yellow">
          Why Choose WazirX
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-wazirx-blue" />
              <h3 className="text-xl font-semibold mb-2 text-wazirx-yellow">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
