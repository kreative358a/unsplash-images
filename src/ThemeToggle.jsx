import { useGlobalContext } from "./context";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <section className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillSunFill
            style={{ color: "lemonchiffon" }}
            className="toggle-icon"
          />
        ) : (
          <BsFillMoonFill
            style={{ color: "darkblue" }}
            className="toggle-icon"
          />
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
