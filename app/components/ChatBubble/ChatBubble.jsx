import React, { useState } from "react";
import Chatbot from "../Chatbot/Chatbot.jsx"; // Adjust the import path as necessary

export default function ChatBubble() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Store chat history at this level

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatVisible ? (
        <button onClick={toggleChatVisibility} className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Chat
        </button>
      ) : (
        <Chatbot
          toggleChatVisibility={toggleChatVisibility}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory} // Pass setChatHistory as prop
        />
      )}
    </div>
  );
}
