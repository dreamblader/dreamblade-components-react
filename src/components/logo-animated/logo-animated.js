import React from "react";
import { Logo } from "../logo";
import run from "../../scripts";
import styles from "./logo.module.css";

export const LogoAnimated = (props) => {
  React.useEffect(() => {
    run();
  }, []);
  return (
    <div className={styles.animate}>
      <Logo />
    </div>
  );
};
