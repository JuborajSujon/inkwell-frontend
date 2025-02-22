import { ModeToggle } from "@/components/mode-toggle";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h1>This is Home Page</h1>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
