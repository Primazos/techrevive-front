import { useEffect, useState } from "react";

const ThemeSwitcherButton = () => {
  const themes = ["dracula", "synthwave", "forest"];
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dracula"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex justify-center items-center p-4">
      <select
        className="select select-bordered"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcherButton;
