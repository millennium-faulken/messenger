import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase.js";
import { AuthContext } from "./Auth.js";

const ref = firebase.firestore();
const auth = firebase.auth();

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [error, setError] = useState("");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        ref
          .collection("users")
          .doc(cred.user.uid)
          .set({
            firstName,
            lastName,
            uid: cred.user.uid,
            initials: firstName[0] + lastName[0],
            photoURL: null,
            isOnline: true,
            createdAt: new Date(),
          });
      })
      .catch((err) => {
        setError(err);
      });
  };

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;

  if (currentUserId) return <Redirect to="/home" />;

  console.log(auth.currentUser);

  return (
    <div className="mainLogin">
      <div className="inputBox">
        <h3>Sign Up</h3>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Last Name"
        />
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
        <button onClick={signUp}>Sign Up</button>
        {error.message ? <p className="errorMessage">{error.message}</p> : null}
      </div>
    </div>
  );
};

export default SignUp;
