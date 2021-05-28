import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "../firebase";
import "./layout.css";

const ref = firebase.firestore();
const auth = firebase.auth();

function SignedInLinks() {
  const logOut = () => {
    ref
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth.signOut();
      });
  };

  return (
    <div className="signedIn">
      <NavLink to="/home" className="signOut" onClick={logOut}>
        Log Out
      </NavLink>
    </div>
  );
}

export default SignedInLinks;
