import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import FeaturedProducts from "../Components/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Banner />
      <FeaturedProducts />
    </div>
  );
}
