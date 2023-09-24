import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  console.log("Login");
  const [isSignIn, setIsSignIn] = useState(true);
  const [validationMsg, setValidationMsg] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
    email.current.value = null;
    password.current.value = null;
    setValidationMsg(null);
  };
  // console.log("render");

  const handleButtonSubmit = () => {
    // console.log(email);
    const validationMsg = checkValidData(
      isSignIn,
      email.current?.value,
      password.current?.value,
      name.current?.value
    );

    setValidationMsg(validationMsg);

    if (validationMsg) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then(userCredentials => {
          const user = userCredentials.user;
          // console.log("auth value before profile update is");
          // console.log(auth);

          updateProfile(user, {
            displayName: name.current.value,

            photoURL: USER_AVATAR
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL
                })
              );
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setValidationMsg(errorCode + "-" + errorMessage);
            });
          console.log(userCredentials);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then(userCredentials => {
          // const user = userCredentials.user;
          // console.log(userCredentials);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMsg(errorCode + "-" + errorMessage);
        });
    }

    //sign in/sign up
  };
  return (
    <div>
      <Header />

      <div className="absolute">
        <img
          src={BG_IMG_URL}
          alt="bg"
          className="w-screen h-screen object-cover"
        />
      </div>

      <div className="my-20 mx-auto right-0 left-0 p-10 w-screen md:w-4/12 absolute bg-black bg-opacity-80">
        <form onSubmit={e => e.preventDefault()} className=" text-white">
          <h1 className="text-3xl font-bold mb-2">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <div>
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="my-3 p-2 w-full rounded-md bg-gray-800"
              />
            </div>
          )}
          <div>
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="my-3 p-2 w-full rounded-md bg-gray-800"
            />
          </div>

          <div>
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="my-3 p-2 w-full rounded-md  bg-gray-800"
            />
          </div>
          <p className="p-2 text-red-600 font-bold">{validationMsg}</p>
          <button
            className="bg-red-600 px-4 py-2 font-bold w-full my-5  rounded-md"
            onClick={handleButtonSubmit}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-gray-500">
            {isSignIn ? "New to Netflix?" : "Already a user?"}
            &nbsp;
            <span className="cursor-pointer text-white" onClick={toggleSignIn}>
              {isSignIn ? "Sign Up now" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
