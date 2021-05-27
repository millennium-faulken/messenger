import React, { useState, useEffect, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import firebase from "../firebase";
import "./layout.css";

const ref = firebase.firestore().collection("users");

const logOut = () => {
  firebase.auth().signOut();
};

const SignedInLinks = () => {
  return (
    <div className="signedIn">
      <NavLink to="/" className="signOut" onClick={logOut}>
        Log Out
      </NavLink>
    </div>
  );
};

export default SignedInLinks;
