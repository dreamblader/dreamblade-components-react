import React, { useEffect } from "react";
import Logo from "../logo";
import run from "../../scripts";
import "./style.css";

const LogoAnimated = (props) => {
  useEffect(() => {
    run();
  });
  return (
    <div className="animate">
      <Logo />
    </div>
  );
};

export default LogoAnimated;
