import { Link } from "react-router-dom";
import LogoImg from "@/assets/logo.png";

export default function Logo() {
  return (
    <>
      <Link to={"/"}>
        <span className="hidden md:flex items-center gap-x-1">
          <img
            src={LogoImg}
            width={40}
            height={40}
            alt="Logo"
            className="w-8 h-8 "
          />

          <p className={"font-semibold text-lg font-poppins"}>INKWELL</p>
        </span>
      </Link>
    </>
  );
}
