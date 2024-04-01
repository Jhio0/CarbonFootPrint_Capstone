import React from "react";
import { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Chatbot({ toggleChatVisibility, chatHistory, setChatHistory }) {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatHistoryRef = React.useRef(null);

  const aiContext = "Your name is Sprout. Your main goal is to provide suggestions to users on how to reduce their carbon emissions.";

  const handleUserInput = async () => {
    setIsLoading(true);
    // Directly use setChatHistory from props
    setChatHistory((currentHistory) => [
      ...currentHistory,
      { role: 'user', content: userInput },
      
      // Assistant's response is added here after fetching it from OpenAI
    ]);
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
      { role: 'assistant', content: chatCompletion.choices[0].message.content },
    ]);

    setUserInput("");
    setIsLoading(false);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]); // Dependency array ensures this runs every time chatHistory changes

  return (
    <div className="max-w-md mx-auto mt-10 border-2 border-gray-200 bg-gray-800 text-white flex flex-col p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Sprout: Your Environmental AI Buddy</h1>
        <button
          onClick={toggleChatVisibility}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none transition duration-150 ease-in-out"
        >
          X
        </button>
      </div>
      <div ref={chatHistoryRef} className="flex-grow overflow-auto p-3 bg-gray-700 rounded max-h-[500px]"> {/* Adjust the max-h-[500px] as needed */}
        {chatHistory.map((chat, index) => (
          <div key={index} className={`flex flex-col mb-2 ${chat.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`text-sm p-2 rounded-lg ${chat.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-gray-900"}`}>
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
          placeholder="Type your message..."
          className="input flex-grow rounded-l-md p-2 bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />
        <button
          onClick={handleUserInput}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
