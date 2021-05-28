import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../auth/Auth";
import Messenger from "../layout/Messenger";
import "./dashboard.css";

function Homepage() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  if (!currentUserId) return <Redirect to="/signin" />;

  return (
    <div className="main">
      <Messenger />
    </div>
  );
}

export default Homepage;
