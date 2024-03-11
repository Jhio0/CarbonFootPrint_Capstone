import React from "react";
import { useState, useEffect } from "react";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true,
});

// shoutout BugNinza on youtube for the tutorial: https://www.youtube.com/watch?v=G4VrgJ3Mzj4

export default function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async () => {
    setIsLoading(true);
    setChatHistory((chatHistory) => 
    [...chatHistory, 
    {role: 'user', content: userInput }]);

    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, {role: 'assistant', content: userInput}],
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
    <div className="chatContainer border-2 border-white bg-black flex flex-col w-1/5 p-4 rounded-xl ">
      <div className="headerContainer">
        <h1 className="text-2xl pb-2">Seedless: Your Environmental AI Buddy!</h1>
      </div>
      <div className="chatHistoryContainer" style={{height:400}}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={`${
            chat.role === "user" ? "text-left" : "text-right"
          } mb-2`}>
            <div className={`rounded-m ${chat.role === "user" ? "bg-blue-300 text-blue-800" : "bg-green-300 text-green-800" }`}>
              {chat.role === "user" ? "You: " : "Seedless: "}
            </div>
            <div className={`${chat.role === "user" ? "bg-blue-300 text-blue-800" : "bg-green-300 text-green-800" }`}>
              {chat.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row"> 
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="animate-spin">Loading...</div>
        ) : (
          <div>
            <button onClick={handleUserInput}>Send</button>
          </div> 
        )}
      </div>
    </div>
  );

}

// async function main() {
//   const embedding = await openai.embeddings.create({
//     model: "text-embedding-ada-002",
//     input: "The quick brown fox jumped over the lazy dog",
//   });

//   console.log(embedding);
// }
// main();