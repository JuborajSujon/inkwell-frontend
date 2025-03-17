import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Banner1 from "@/assets/banner1.jpg";
import Banner2 from "@/assets/banner2.webp";
import Banner3 from "@/assets/banner3.jpg";

const offers = [
  {
    title: "Exclusive Stationery Deals!",
    description: "Get up to 30% off on premium notebooks and pens.",
    image: Banner1,
  },
  {
    title: "New Arrivals!",
    description:
      "Explore our latest collection of artistic tools and planners.",
    image: Banner2,
  },
  {
    title: "Limited-Time Offer!",
    description: "Buy 2 get 1 free on all writing essentials.",
    image: Banner3,
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % offers.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);

  return (
    <div className="relative w-full h-[60vh] mx-auto mt-8 overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <img
          src={offers[current].image}
          alt={offers[current].title}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center p-6">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            {offers[current].title}
          </h2>
          <p className="text-xl text-white drop-shadow-md mt-2">
            {offers[current].description}
          </p>
          <Button className="mt-4">Shop Now</Button>
        </div>
      </div>
      {/* Navigation Controls */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/50 rounded-full"
        onClick={prevSlide}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/50 rounded-full"
        onClick={nextSlide}>
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
