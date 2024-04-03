"use client";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext.js";
import { addThread, getThreads, editThread} from "./_services/thread-service.js";
import { Button } from "@mui/material";
// CreatedAT (DATE), POST ID, Title, Content, Edit, Reply
// EDIT ? Firebase
const ForumPage = () => {
  const [threads, setThreads] = useState([]);
  const [replies, setReplies] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [ThreadClicked, setThreadClicked] = useState("");

  const thread = {
    title: title,
    content: content,
    author: "",
    date: date,
    threadUid: "",
    replies: replies,
  };

  // Write a getDate that formats the date object for a string. Potentially delete and re-create DB for string date.
  const { user } = UserAuth(); // Get the user from the auth hook
  const handleAddThread = async (newThread) => {
    if (user.displayName === null) {
      newThread.author = "Anonymous";
    } else {
      newThread.author = user.displayName;
    }
    newThread.threadUid = user.uid;
    await addThread(user.uid, newThread);
    setThreads([...threads, newThread]);
  };
  //GET threads and populate page.
  const loadThreads = async () => {
    const storedThreads = await getThreads(user.uid);
    setThreads(storedThreads);
  };
  const handleEditThread = async (thread) => {
    console.log("Inside handleEditThread.")
    await editThread(thread);
  };
  function formatDate(dateObject) {
    const year = dateObject.getFullYear();
    // Months are zero-indexed (January = 0)
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const seconds = String(dateObject.getSeconds()).padStart(2, "0");

    // Customize the output format here
    return `${day} ${month} ${year} at ${hours}:${minutes}:${seconds}`;
  }

  //Post with title and content, assign to userID.
  const handleSubmit = async (event) => {
    //Prevent form from refreshing.
    event.preventDefault();

    // Ensure user is authenticated
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      //Send thread to db;
      thread.date = formatDate(new Date());
      console.log(thread.date);
      handleAddThread(thread);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting thread:", error);
      // Handle error
    }
  };

  //DELETE the thread.
  //Refresh page and remove info - delete from db itself.
  //UPDATE the thread.

  useEffect(() => {
    if (user) {
      loadThreads();
    } else {
      return;
    }
  }, [user]);

  //Find the thread by matching user ID to author.
  const findThreadById = (id) => {
    console.log(id);
    return threads.find((thread) => thread.threadUid === id);
  };

  // Find the correct thread id that matches user
  // If found, re-write title and content.
  // Over-write data in front and back end.
  const handleEditClick = async (editThread, tid) => {
    if (editThread.threadUid === user.uid) {
      handleEditThread(editThread)
      setThreadClicked(tid);
    }
  };

  return (
    <>
      <main className="home">
        <div className="bg-gray-800 py-4 px-4 rounded-md">
          <div>
            <h1 className="text-2xl text-white">Create a Thread</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-2">
              <div>
                <label htmlFor="date" className="text-white">
                  Title:
                </label>
              </div>
              <div>
                <textarea
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-black textarea"
                />
              </div>
            </div>
            <div className="p-2">
              <div>
                <label htmlFor="content" className="text-white">
                  Content:
                </label>
              </div>
              <div>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="text-black textarea"
                />
              </div>
            </div>
            <button
              style={{
                color: "black",
                backgroundColor: "white",
                marginLeft: "0.8rem",
              }}
              className="py-4 px-6 text-white"
              onSubmit={addThread}
              type="submit"
            >
              CREATE THREAD
            </button>
          </form>
          <div className="threadsContainer m-2 py-2 ">
            {/* Display threads here  */}
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="p-3 bg-gray-500 rounded-md m-3 text-white"
              >
                <h2>{thread.title}</h2>
                <p>{thread.content}</p>
                <div>
                  <Button
                    key={thread.id}
                    className=" m-2 text-decoration-none btn btn-sm btn-success flex-row"
                    onClick={() => handleEditClick(thread, thread.id)}
                  >
                    Edit
                  </Button>
                  {ThreadClicked === thread.id && (
                    <div className="popup">
                      <h2>Edit Thread</h2>
                      <label>Title:</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label>Content:</label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                      <button>Save</button>
                      <button>Cancel</button>
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    className="m-2 text-decoration-none btn btn-sm btn-success flex-row"
                    // onClick={ () => deleteThread(/delete/${thread.id})}
                  >
                    Delete
                  </Button>
                </div>
                <p>{thread.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
export default ForumPage;
