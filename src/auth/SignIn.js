import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import { FcGoogle } from "react-icons/fc";
import firebase from "../firebase.js";
import "./auth.css";

const auth = firebase.auth();
const ref = firebase.firestore();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        ref.collection("users").doc(data.user.uid).update({
          isOnline: true,
        });
      })
      .catch((err) => {
        setError(err);
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;

  if (currentUserId) return <Redirect to="/" />;

  return (
    <div className="mainLogin">
      <h1>Login</h1>
      <button onClick={signInWithGoogle} className="googleButton">
        <div className="google">
          <FcGoogle />
        </div>
        <p>Sign in with Google</p>
      </button>
      <h3>- OR -</h3>
      <div className="inputBox">
        <h4>Sign in with email:</h4>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={login}>Login</button>
      </div>
      {error.message ? <p className="errorMessage">{error.message} Please try again.</p> : null}
    </div>
  );
};

export default SignIn;
