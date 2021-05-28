import firebase from "../firebase";
import { useContext, useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../auth/Auth";
import moment from "moment";
import "./layout.css";

const auth = firebase.auth();
const ref = firebase.firestore();

function Messenger() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  // const [chatStarted, setChatStarted] = useState(false);
  // const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const placeholder = useRef(null);
  const sender = currentUserId;

  useEffect(() => {
    const initChat = () => {
      // setChatStarted(true);
      ref
        .collection("messages")
        .orderBy("createdAt", "asc")
        .onSnapshot((querySnapshot) => {
          const chat = [];
          const friend = receiver.uid;
          querySnapshot.forEach((doc) => {
            if (
              (doc.data().sender === sender &&
                doc.data().receiver === friend) ||
              (doc.data().sender === friend && doc.data().receiver === sender)
            ) {
              chat.push(doc.data());
            }
          });
          setConversation(chat);
        });
    };
    initChat(receiver);
  }, [sender, receiver]);

  useEffect(() => {
    function getAllUsers() {
      const unsubscribe = ref;
      ref
        .collection("users")
        .orderBy("isOnline", "desc")
        .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().uid !== currentUserId) {
              users.push(doc.data());
            }
          });
          setUsers(users);
          return unsubscribe;
        });
    }
    getAllUsers();
  }, [currentUserId]);

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
    placeholder.current.scrollIntoView({ behavior: "smooth" });
  };

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
                  <span
                    className={user.isOnline ? `online` : `online off`}
                  ></span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="mainMessenger">
        <div className="chatHeader">
          {receiver && (
            <h1>
              {/* {receiver.photoURL ? (
                <div className="receiverPhoto">
                  <img src={receiver.photoURL} alt="userPhoto" />
                </div>
              ) : (
                <div className="defaultPhoto">
                  <FaUserCircle className="noPic" />
                </div>
              )} */}
              {receiver.firstName} {receiver.lastName}
            </h1>
          )}
        </div>
        <div className="chat">
          {conversation.map((con) => {
            return (
              <div key={uuidv4()}>
                {con.sender === sender ? (
                  <div className={`message_sent`} ref={placeholder}>
                    <p className="msg">{con.message}</p>
                    <p className="timestamp">
                      {con.createdAt &&
                        moment(con.createdAt.toDate()).calendar()}
                    </p>
                  </div>
                ) : (
                  <div className={`message_received`} ref={placeholder}>
                    <p className="msg_received">{con.message}</p>
                    <p className="timestamp_received">
                      {con.createdAt &&
                        moment(con.createdAt.toDate()).calendar()}
                    </p>
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
