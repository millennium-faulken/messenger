import firebase from "../firebase";
import { useContext, useEffect, useRef, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { IoSend } from "react-icons/io5";
import "./layout.css";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../auth/Auth";

const auth = firebase.auth();
const ref = firebase.firestore();

function Messenger() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [chatStarted, setChatStarted] = useState(false);
  // const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const sender = currentUserId;

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

  const initChat = () => {
    setChatStarted(true);
    ref
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const chat = [];
        const friend = receiver.uid;
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().sender == sender && doc.data().receiver == friend) ||
            (doc.data().sender == friend && doc.data().receiver == sender)
          ) {
            chat.push(doc.data());
          }
        });
        setConversation(chat);
        console.log(chat);
      });
  };

  useEffect(() => {
    getAllUsers();
    initChat(receiver);
  }, [receiver]);

  const sendMessage = (e) => {
    e.preventDefault();
    ref.collection("messages").add({
      sender: auth.currentUser.uid,
      receiver: receiver.uid,
      message,
      read: false,
      createdAt: new Date(),
    });

    setMessage("");

    // placeholder.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(conversation);
  return (
    <div className="container">
      <div className="friendList">
        {users &&
          users.map((user) => {
            return (
              <div
                onClick={() => setReceiver(user)}
                key={user.uid}
                className="friends"
              >
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
      <div className="mainMessenger">
        <div className="chat">
          {conversation.map((con) => {
            return (
              <div>
                {con.sender === sender ? (
                  <div className={`message_sent`}>
                    <p>{con.message}</p>
                  </div>
                ) : (
                  <div className={`message_received`}>
                    <p>{con.message}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="messageInput">
          <textarea
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Say something nice..."
          />
          <button onClick={sendMessage}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
