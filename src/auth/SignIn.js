import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import { FcGoogle } from "react-icons/fc";
import firebase from "../firebase.js";

const auth = firebase.auth();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
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

  if (currentUserId) return <Redirect to="/home" />;

  return (
    <div className="mainLogin">
      <h3>Login</h3>
      <div className="inputBox">
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
        {error.message ? <p className="errorMessage">{error.message}</p> : null}
      </div>
      <button onClick={signInWithGoogle} className="googleButton">
        <div className="google">
          <FcGoogle />
        </div>
        <p>Sign in with Google</p>
      </button>
    </div>
  );
};

export default SignIn;
