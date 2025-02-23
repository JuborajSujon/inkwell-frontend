import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import FeaturedProducts from "../Components/FeaturedProducts";
import EcommerceSections from "../Components/Ecommerce";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Banner />
      <FeaturedProducts />
      <EcommerceSections />
    </div>
  );
}
