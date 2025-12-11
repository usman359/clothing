import { Shield, Star, Truck, Heart } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over Rs. 2000",
      gradient: "from-pink-500 to-purple-500",
      bgGradient: "from-pink-50 to-purple-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "100% safe checkout",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      icon: Star,
      title: "Super Quality",
      description: "Soft & comfy for kids",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Quality you can trust",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-linear-to-br ${feature.bgGradient} border-2 ${feature.borderColor} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-14 h-14 rounded-full bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3
                  className={`font-bold text-xl mb-2 ${feature.textColor} group-hover:scale-105 transition-transform duration-300`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
