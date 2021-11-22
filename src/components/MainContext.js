import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";

const MainContext = () => {
  const { theme } = useContext(ThemeContext);
  const { text } = useContext(LanguageContext);
  const { auth } = useContext(AuthContext);

  return (
    <main className={theme}>
      {auth ? <p>{text.mainHello}</p> : <p>{text.mainWelcome}</p>}

      <p>{text.mainContent}</p>
    </main>
  );
};

export default MainContext;
