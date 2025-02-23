import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Banner />
    </div>
  );
}
