
import React from "react";
import { useState } from "react";
import Chatbot from "../Chatbot/Chatbot.jsx";
import { Chat } from "@mui/icons-material";

export default function ChatBubble(){
    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
      };

    return (
        <div className="fixed bottom-4 right-4 z-50">
        {!isChatVisible ? (
          // Chat icon button
          <button onClick={toggleChatVisibility} className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Chat
          </button>
        ) : (
            <Chatbot toggleChatVisibility={toggleChatVisibility}/>
        )}
      </div>
    );
}