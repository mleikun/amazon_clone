import React, { useState, useContext } from "react";
import classes from "./SignIn.module.css";
import LayOut from "../../Components/LayOut/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Util/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Util/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState({
    signUp: false,
    signIn: false,
  });
  const navigate = useNavigate();
  const navStateData = useLocation();

  const [{ user }, dispatch] = useContext(DataContext);

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      setisLoading({ ...isLoading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setisLoading({ ...isLoading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setisLoading({ ...isLoading, signIn: false });
        });
    } else {
      setisLoading({ ...isLoading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setisLoading({ ...isLoading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setisLoading({ ...isLoading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo link */}
      <Link to={"/"}>
        <img
          src="https://en.wikichip.org/w/images/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt="Amazon logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            {isLoading.signIn ? (
              <ClipLoader color="#fff" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By Signing-in MAKEDA's FAKE Amazon clone you are agreeing to the Terms
          and Condiitons of Makeda's Evangadi Amazon-clone project. Please see
          our notice on using cookies and our Ads.
        </p>
        {/* create account */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login__registerButton}
        >
          {isLoading.signUp ? (
            <ClipLoader color="#fff" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && <small>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
