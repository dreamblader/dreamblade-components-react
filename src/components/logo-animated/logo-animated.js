import React from "react";
import { Logo } from "../logo";
import run from "../../scripts";
import "./style.css";

export const LogoAnimated = (props) => {
  React.useEffect(() => {
    run();
  }, []);
  return (
    <div className="animate">
      <Logo />
    </div>
  );
};
