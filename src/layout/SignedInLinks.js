import React from "react";
import { NavLink } from "react-router-dom";
import firebase from "../firebase";
import "./layout.css";

const ref = firebase.firestore();

const logOut = (uid) => {
  firebase.auth().signOut();
  // ref.collection("users").doc(uid).update({
  //   isOnline: false,
  // });
};

const SignedInLinks = () => {
  return (
    <div className="signedIn">
      <NavLink to="/home" className="signOut" onClick={logOut}>
        Log Out
      </NavLink>
    </div>
  );
};

export default SignedInLinks;
