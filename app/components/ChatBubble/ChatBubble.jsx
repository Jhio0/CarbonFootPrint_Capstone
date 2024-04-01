import React, { useState } from "react";
import Chatbot from "../Chatbot/Chatbot.jsx";
import { FaRegComments } from "react-icons/fa"; // Make sure to install react-icons using `npm install react-icons`

export default function ChatBubble() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatVisible ? (
        <button
          onClick={toggleChatVisibility}
          className="flex items-center justify-center w-16 h-16 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg p-4 text-center transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
          aria-label="Open Chat"
        >
          <FaRegComments />
        </button>
      ) : (
        <Chatbot
          toggleChatVisibility={toggleChatVisibility}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      )}
    </div>
  );
}
