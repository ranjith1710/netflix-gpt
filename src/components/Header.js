import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
// import lang from "../utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const lang = useSelector(store => store.config.lang);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(error => navigate("/error"));
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = e => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    console.log("use effect is called");
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("on auth state change ");
        console.log(user);
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      console.log("unsubscribe called");
      unsubscribe();
    };
  }, []);
  return (
    <div className="z-10 w-screen p-3 absolute tansparent bg-gradient-to-b from-black flex flex-col md:flex-row justify-between ">
      <img className="w-40 md:mx-0 mx-auto" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex items-center justify-between p-2">
          {showGptSearch && (
            <select
              value={lang}
              className="bg-yellow-950 text-white p-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map(language => (
                <option
                  key={language.identifier}
                  value={language.identifier}
                  aria-checked
                >
                  {language.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="bg-blue-600 text-white py-2 px-4 mx-4 rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img className="hidden w-10" src={user?.photoURL} alt="usericon" />
          <button
            onClick={handleSignOut}
            className="font-bold text-white bg-black px-4  py-2 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
