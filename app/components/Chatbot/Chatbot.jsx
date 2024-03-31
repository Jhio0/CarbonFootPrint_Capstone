"use client"
import React from "react";
import { useState, useEffect } from "react";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true,
});

// shoutout BugNinza on youtube for the tutorial: https://www.youtube.com/watch?v=G4VrgJ3Mzj4

export default function Chatbot( {toggleChatVisibility} ) {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const aiContext = "Your name is Sprout. Your main goal is to provide suggestions to users on how to reduce their carbon emissions.";


  const handleUserInput = async () => {
    setIsLoading(true);
    setChatHistory((chatHistory) => 
    [...chatHistory, 
    {role: 'user', content: userInput }]);


      const messagesWithBaseContext = [
        { role: "system", content: aiContext },
        ...chatHistory,
        { role: "user", content: userInput },
      ];

      const chatCompletion = await openai.chat.completions.create({
        messages: messagesWithBaseContext,
        model: "gpt-3.5-turbo",
      });
  
    setChatHistory((prevChat) => [
      ...prevChat,
      {role: 'assistant', content: chatCompletion.choices[0].message.content},
    ]);
  
    setUserInput("");
    setIsLoading(false);

  }

  return (
    <div className="border-2 border-white bg-black flex flex-col w-80 p-4 rounded-xl overflow-hidden">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-white">Sprout: Your Environmental AI Buddy!</h1>
      <button onClick={toggleChatVisibility} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
        X
      </button>
    </div>
    {/* Chat history and input fields */}
    <div className="chatHistoryContainer h-96 overflow-auto mb-4 p-3">
      {chatHistory.map((chat, index) => (
        <div key={index} className={`flex flex-col mb-2 ${chat.role === "user" ? "items-end" : "items-start"}`}>
          <div className={`text-sm ${chat.role === "user" ? "bg-blue-300 text-blue-800" : "bg-green-300 text-green-800"} rounded-md px-2 py-1`}>
            {chat.content}
          </div>
        </div>
      ))}
    </div>
    <div className="flex">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="grow rounded-l-md p-2"
      />
      {isLoading ? (
        <button className="bg-gray-300 text-gray-800 rounded-r-md px-4">...</button>
      ) : (
        <button onClick={handleUserInput} className="bg-blue-500 hover:bg-blue-700 text-white rounded-r-md px-4">
          Send
        </button>
      )}
    </div>
  </div>
  );

}
