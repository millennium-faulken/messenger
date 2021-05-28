import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import SignedInLinks from "./SignedInLinks";
import { BiMessageRoundedError } from "react-icons/bi";
import SignedOutLinks from "./SignedOutLinks";
import "./layout.css";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const links = currentUser ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <div className="nav">
      <h1 className="logo">
        bubble
        <BiMessageRoundedError />
      </h1>
      {links}
    </div>
  );
};

export default Nav;
