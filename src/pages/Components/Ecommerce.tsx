import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Alice Johnson",
    review:
      "Inkwell's notebooks are top-notch! The paper quality is amazing, and the designs are stunning.",
    rating: 5,
  },
  {
    name: "Mark Thompson",
    review:
      "Fast delivery and excellent customer service. Highly recommend this shop!",
    rating: 4,
  },
  {
    name: "Sophie Williams",
    review:
      "Great selection of pens! I've been using them for journaling, and they write so smoothly.",
    rating: 5,
  },
];

const blogs = [
  {
    title: "The Art of Journaling",
    description: "Discover how to start journaling and make it a daily habit.",
    link: "/blog/journaling",
  },
  {
    title: "Best Pens for Calligraphy",
    description:
      "A guide to the finest calligraphy pens for professionals and beginners.",
    link: "/blog/calligraphy-pens",
  },
  {
    title: "Organize Your Life with a Planner",
    description:
      "Find out how planners can boost productivity and time management.",
    link: "/blog/planner-organization",
  },
];

export default function EcommerceSections() {
  return (
    <div className="space-y-28 py-16 max-w-7xl mx-auto px-6">
      {/* Testimonials Section */}
      <section className="space-y-14">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-center mb-6">
            What Our Customers Say
          </h2>
          <p className=" mt-2 w-3/4 mx-auto">
            We're proud of the relationships we build with our customers. Read
            their testimonials to see how we've helped them succeed.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 text-center shadow-md">
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" />
                  ))}
                </div>
                <p className=" mb-2">"{testimonial.review}"</p>
                <h3 className="font-semibold">- {testimonial.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="space-y-14">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Latest from Our Blog
          </h2>
          <p className=" mt-2 w-3/4 mx-auto">
            Find valuable information and resources in our recent blog articles.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <Card key={index} className="p-6 shadow-md">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-muted-foreground mb-4">{blog.description}</p>
                <Link
                  to={blog.link}
                  className="text-primary font-medium hover:underline">
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
