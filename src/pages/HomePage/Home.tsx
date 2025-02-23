import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import FeaturedProducts from "../Components/FeaturedProducts";
import EcommerceSections from "../Components/Ecommerce";
import ContactSection from "../Components/ContactSection";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Banner />
      <FeaturedProducts />
      <EcommerceSections />
      <ContactSection />
    </div>
  );
}
