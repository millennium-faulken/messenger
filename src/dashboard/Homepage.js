import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../auth/Auth";
import Messenger from "../layout/Messenger";
import "./dashboard.css";

function Homepage() {
  return (
    <div className="main">
      <Messenger />
    </div>
  );
}

export default Homepage;
