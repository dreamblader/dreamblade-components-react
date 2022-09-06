import { LogoAnimated } from "../components/logo-animated";

export default {
  title: "LogoAnimated",
  component: LogoAnimated,
};

export const Normal = () => (
  <div style={{ backgroundColor: "blue" }}>
    <LogoAnimated />
  </div>
);
