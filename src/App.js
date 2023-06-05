import logo from "./logo.svg";
import "./App.css";
import "./normal.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "how can i help you today?",
    },
    {
      user: "me",
      message: "i want to use chatgpt today",
    }]);
    function clearChat(){
      setChatLog([]);
    }
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log('submit')
    let chatLogNew =[...chatlog, { user: "me", message: `${input}` }];
   setInput("");
   setChatLog(chatLogNew)
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const respons = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message: messages
      }),
    });
    const data = await respons.json();
    setChatLog([...chatLogNew ,{user:"gpt", message:`${data.message}`}])
    console.log(data.message);
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          new chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {/* <div className="chat-message ">
          <div className="chat-message-center"> <div className="avatar"></div>
            <div className="message">hello world</div>
          </div></div> */}
          {/* <ChatMessage message={message}/> */}
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        {/* <div className="chat-log">
          <div className="chat-message chatgpt">
          <div className="chat-message-center">
           <div className="avatar chatgpt">
            
           </div>
            <div className="message">hello world</div>
          </div></div>
           
        </div>  */}
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
              placeholder="type your message"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message  ${message.user == "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user == "gpt" && "chatgpt"}`}></div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};
export default App;
