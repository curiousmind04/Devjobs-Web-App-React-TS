import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const RootLayout = () => {
  const [theme, setTheme] = useState<string>("light");

  const themeHandler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="app" data-theme={theme}>
      <Header themeHandler={themeHandler} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
