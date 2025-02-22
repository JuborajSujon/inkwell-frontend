import {
  NotebookPen,
  Users,
  Award,
  Clock,
  MapPin,
  PhoneCall,
  Mail,
  PenTool,
  Palette,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-5xl font-bold">Welcome to Inkwell</h1>
        <p className="text-lg text-muted-foreground">
          Crafting inspiration, one page at a time. Your premier destination for
          high-quality stationery, tools, and creativity essentials.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At Inkwell, we believe in the power of putting pen to paper. Whether
            you're journaling, sketching, or organizing your thoughts, we
            provide the finest tools to bring your creativity to life.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-primary" />
              <span>Premium Stationery</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>10K+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Award-Winning Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Since 2010</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="/src/assets/Stationery tools.jpg"
            alt="Stationery tools"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <NotebookPen className="w-8 h-8 text-primary" />,
              title: "Creativity & Expression",
              description:
                "Encouraging self-expression through quality writing and artistic tools.",
            },
            {
              icon: <Palette className="w-8 h-8 text-primary" />,
              title: "Design & Quality",
              description:
                "Curating timeless, elegant, and functional stationery products.",
            },
            {
              icon: <Users className="w-8 h-8 text-primary" />,
              title: "Community & Learning",
              description:
                "Fostering a creative community through workshops and resources.",
            },
          ].map((value, index) => (
            <Card key={index} className="p-6">
              <CardContent className="space-y-3 text-center">
                <div>{value.icon}</div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto mt-16 bg-card p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Visit Us</h2>
        <p className="text-muted-foreground mb-6">
          Explore our collection in person or reach out for any inquiries.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span>456 Ink Street, Artisan District, NY 10001</span>
          </div>
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-primary" />
            <span>+1 (555) 789-1234</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>support@inkwellstore.com</span>
          </div>
        </div>
      </section>
    </div>
  );
}
