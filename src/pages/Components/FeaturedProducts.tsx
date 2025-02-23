import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Elegant Leather Notebook",
    description: "Premium quality leather-bound notebook for professionals.",
    category: "Stationery",
    image: "/src/assets/product1.jpg",
    price: "$25.99",
  },
  {
    id: 2,
    name: "Classic Fountain Pen",
    description: "Smooth ink flow with a timeless design.",
    category: "Writing Essentials",
    image: "/src/assets/product2.jpg",
    price: "$19.99",
  },
  {
    id: 3,
    name: "Artistic Sketchbook",
    description: "High-quality paper for artists and illustrators.",
    category: "Art Supplies",
    image: "/src/assets/product3.jpg",
    price: "$15.99",
  },
  {
    id: 4,
    name: "Minimalist Planner",
    description: "Organize your tasks efficiently with this sleek planner.",
    category: "Planners",
    image: "/src/assets/product4.jpg",
    price: "$12.99",
  },
  {
    id: 5,
    name: "Premium Calligraphy Set",
    description: "Perfect for beginners and professionals alike.",
    category: "Writing Essentials",
    image: "/src/assets/product5.jpg",
    price: "$29.99",
  },
  {
    id: 6,
    name: "Designer Sticky Notes",
    description: "Bright and stylish sticky notes for daily use.",
    category: "Stationery",
    image: "/src/assets/product6.jpg",
    price: "$8.99",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-6xl mx-auto mt-16 px-6 md:px-12 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground mt-2">
          Discover our hand-picked selection of top stationery items.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-4 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <CardContent className="text-center space-y-3 mt-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <p>{product.category}</p>
              <span className="text-lg font-bold">{product.price}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild>
          <Link to="/all-products">View All</Link>
        </Button>
      </div>
    </section>
  );
}
