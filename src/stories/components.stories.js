import React from "react";
import { storiesOf } from "@storybook/react";
import Logo from "../components/logo";
import LogoAnimated from "../components/logo-animated";

const stories = storiesOf("Test", module);

stories.add("Logo", () => {
  return <Logo />;
});

stories.add("Logo Animated", () => {
  return <LogoAnimated />;
});
