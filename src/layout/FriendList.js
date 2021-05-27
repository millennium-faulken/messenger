import firebase from "../firebase";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./layout.css";

const ref = firebase.firestore();

function FriendList() {
  const [users, setUsers] = useState([]);

  function getAllUsers() {
    const unsubscribe = ref;
    ref
      .collection("users")
      .orderBy("isOnline", "desc")
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUsers(users);
        return unsubscribe;
      });
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="friendList">
      {users &&
        users.map((user) => {
          return (
            <div onClick={initChat} key={user.uid} className="friends">
              {user.photoURL ? (
                <div className="friendPhoto">
                  <img src={user.photoURL} alt="userPhoto" />
                </div>
              ) : (
                <div className="defaultPhoto">
                  <FaUserCircle className="noPic" />
                </div>
              )}
              <div className="friendInfo">
                <h1>
                  {user.firstName} {user.lastName}
                </h1>
                {user.isOnline ? <h2>online</h2> : <h2>offline</h2>}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FriendList;
