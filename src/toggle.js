import React, { useEffect, useState } from "react";
import "./toggle.css";
import { setTheme } from "./themes";
import iconMoon from "./assets/icon-moon.svg";
import iconSun from "./assets/icon-sun.svg";

function Toggle() {
  const [togClass, setTogClass] = useState("dark");
  let theme = localStorage.getItem("theme");

  const handleOnClick = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
      setTogClass("light");
    } else {
      setTheme("theme-dark");
      setTogClass("dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTogClass("dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTogClass("light");
    }
  }, [theme]);

  return (
    <div className="container--toggle">
      {" "}
      {togClass === "light" ? (
        <img src={iconMoon} alt="light theme" onClick={handleOnClick} />
      ) : (
        <img src={iconSun} alt="light theme" onClick={handleOnClick} />
      )}
      <label htmlFor="toggle" className="toggle--label">
        <span className="toggle--label-background"></span>
      </label>
    </div>
  );
}
export default Toggle;
