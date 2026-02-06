import React, { useState } from "react";
import "../Styles/MessagePopup.css"; 

function MessagePopup({close}) {
  const [message, setMessage] = useState(""); 

  const shortcutMessages = [
    "Hello!",
    "How are you?",
    "I will call you later.",
    "Thank you!",
    "hridoy"
  ];

  const handleSend = () => {
    alert("Message sent: " + message); 
    setMessage("");
  };

  return (
        <div className="popup">
            <div className="close"><button onClick={close}>X</button></div>
          <h3>Send Message</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          
          <div className="shortcuts">
            {shortcutMessages.map((msg, index) => (
              <button
              className="text-btn"
                key={index}
                onClick={() => setMessage(msg)}
              >
                {msg}
              </button>
            ))}
          </div>

          <button className="send-btn" onClick={handleSend}>Send</button>
        </div>
  );
}

export default MessagePopup;
