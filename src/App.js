import './App.css';
import {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import io from 'socket.io-client';

const socket = io.connect("https://chatsjsbackend.herokuapp.com/");
let username = nanoid(5);

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, username: username});
    setMessage("");
  }

  useEffect(() => {
    username = prompt("Enter your Username");
  },[]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    })
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Humara Chat</h1>

        {chat.map((payload, index) => {
          return (
            <p key={index}><span id="uid">{payload.username} : </span>{payload.message}</p>
          )
        })}

        <form onSubmit={sendChat}>
          <input type="text" name="chat" placeholder="Send Text" value={message} onChange={(e) => {
            setMessage(e.target.value)
          }} />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
