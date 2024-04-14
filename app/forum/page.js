"use client";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext.js";
import {
  addThread,
  getThreads,
  editThread,
  deleteThread
} from "./_services/thread-service.js";
import { Button } from "@mui/material";
// CreatedAT (DATE), POST ID, Title, Content, Edit, Reply
// EDIT ? Firebase

//notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForumPage = () => {
  const [threads, setThreads] = useState([]);
  const [replies, setReplies] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [ThreadClicked, setThreadClicked] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const thread = {
    title: title,
    content: content,
    author: "",
    date: date,
    threadUid: "",
    replies: replies,
    docRef: "",
  };

  const { user } = UserAuth(); // Get the user from the auth hook
  const handleAddThread = async (newThread) => {
    if (user.displayName === null) {
      newThread.author = "Anonymous";
    } else {
      newThread.author = user.displayName;
    }
    newThread.threadUid = user.uid;
    newThread.docRef = await addThread(user.uid, newThread);
    setThreads([...threads, newThread]);
  };
  const handleDeleteClick = async (deleteThread) => {
    if(user.uid == deleteThread.threadUid) {
      await handleDeleteThread(deleteThread)
      const filteredThreads = threads.filter(thread => thread !== deleteThread);
      console.log('Thread deleted successfully')
      setThreads(filteredThreads)
    }
  };
  const handleDeleteThread = async(thread) => {
    await deleteThread(thread)
  }
  //GET threads and populate page.
  const loadThreads = async () => {
    const storedThreads = await getThreads(user.uid);
    setThreads(storedThreads);
  };
  const handleEditThread = async (thread) => {
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
    event.preventDefault(); // Prevent form from refreshing
  
    // Ensure user is authenticated
    if (!user) {
      console.error("User is not authenticated.");
      toast.error("You need to be logged in to create a thread.", {
        position: "top-center",
      });
      return;
    }
  
    // Validation: Check if the title is empty
    if (title.trim().length === 0) {
      console.error("The title cannot be empty.");
      toast.error("The title cannot be empty.", {
        position: "top-center",
      });
      return; // Prevent further execution if validation fails
    }
  
    // Validation: Check if the title exceeds 100 characters
    if (title.length > 100) {
      console.error("Title exceeds the maximum length of 100 characters.");
      toast.error("Title cannot exceed 100 characters.", {
        position: "top-center",
      });
      return; // Prevent further execution if validation fails
    }
  
    // Validation: Check if the content exceeds 1000 characters
    if (content.length > 1500) {
      console.error("Content exceeds the maximum length of 1500 characters.");
      toast.error("Content cannot exceed 1500 characters.", {
        position: "top-center",
      });
      return; // Prevent further execution if validation fails
    }
  
    try {
      // Proceed with adding the thread to the database
      thread.date = formatDate(new Date());
      await handleAddThread(thread);
      console.log("Thread Created");
      toast.success("Thread created successfully!", {
        position: "top-center",
      });
      // Reset form fields after successful submission
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting thread:", error);
      toast.error("An error occurred while creating the thread.", {
        position: "top-center",
      });
    }
  };
  
  //DELETE the thread.
  //Refresh page and remove info - delete from db itself.

  useEffect(() => {
    if (user) {
      loadThreads();
    } else {
      return;
    }
  }, [user]);

  //Find the thread by matching user ID to author.
  const findThreadById = (id) => {
    // console.log(id);
    return threads.find((thread) => thread.threadUid === id);
  };

  const handleEditClick = async (editThread, tid) => {
    if (editThread.threadUid === user.uid) {
      setThreadClicked(tid);
    }
  };

  const handleEditSubmit = async (editThread) => {
    // Prevent submission if the editTitle is empty or consists only of whitespace
    if (editTitle.trim().length === 0) {
      console.error("The title cannot be empty.");
      toast.error("The title cannot be empty.", {
        position: "top-center",
      });
      return; // Prevent further execution if validation fails
    }
  
    // Prevent submission if the editTitle exceeds 100 characters
    if (editTitle.length > 100) {
      console.error("Title exceeds the maximum length of 100 characters.");
      toast.error("Title cannot exceed 100 characters.", {
        position: "top-center",
      });
      return; // Prevent further execution if validation fails
    }
  
    // Prevent submission if the editContent exceeds 1000 characters
    if (editContent.length > 1500) {
      console.error("Content exceeds the maximum length of 1500 characters.");
      toast.error("Content cannot exceed 1500 characters.", {
        position: "top-center",
      });
      return; // Prevent further execution if validation fails
    }
  
    try {
      // Proceed with updating the thread in the database
      editThread.title = editTitle;
      editThread.content = editContent;
      await handleEditThread(editThread);
      console.log("Thread Updated");
      toast.success("Thread updated successfully", {
        position: "top-center",
      });
      // Reset edit fields and close edit form
      setEditTitle("");
      setEditContent("");
      setThreadClicked(""); // Assuming this resets the edit mode
      loadThreads(); // Reload threads to reflect the edited changes
    } catch (error) {
      console.error("Error updating thread:", error);
      toast.error("An error occurred while updating the thread.", {
        position: "top-center",
      });
    }
  };
  


  return (
    <>
      <main className="home">
        <div className="bg-[#1E1E1C] py-4 px-4 rounded-md">
          <div className="flex flex-col items-center">
          <div>
            <h1 className=" mb-4 mr-8 text-2xl text-white space-y-2">Create a Thread</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-2 space-y-4">
              <div>
                <label htmlFor="date" className="text-white ">
                  Title
                </label>
              </div>
              <div>
                <textarea
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white text-black textarea"
                />
              </div>
            </div>
            <div className="p-2 space-y-4">
              <div>
                <label htmlFor="content" className="text-white">
                  Content
                </label>
              </div>
              <div >
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mr-10 h-[150px] bg-white text-black textarea"
                />
              </div>
            </div>
            <div className="">
            <button
              className="mt-2 mx-4 bg-[#79A93D] hover:bg-[#3F6B2F] text-white font-bold py-2 px-4 rounded py-4 px-6"
              onSubmit={addThread}
              type="submit"
            >
              CREATE THREAD
            </button>
            </div>
          </form>
          </div>
          <div className="threadsContainer m-2 py-2">
            {/* Display threads here  */}
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="p-3 bg-[#1E1E1C] m-3 text-white border-t-2 border-[#343430]"
              >
                <h2>{thread.title}</h2>
                <p>{thread.content}</p>
                {user.uid === thread.threadUid && (
                <><div className="grid grid-cols-12">
                    <Button
                      key={thread.id}
                      className="m-2 text-decoration-none btn btn-sm btn-success bg-[#79A93D] hover:bg-[#3F6B2F]"
                      onClick={() => handleEditClick(thread, thread.id)}
                    >
                      Edit
                    </Button>
                    {ThreadClicked === thread.id && (
                      <div className="popup">
                        <h2>Edit Thread</h2>
                        <label>Title:</label>
                        <textarea
                          id="editTitle"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="text-black textarea" />
                        <label>Content:</label>
                        <textarea
                          id="editContent"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="text-black textarea" />
                        <button className="m-2 text-white btn btn-sm btn-success bg-[#79A93D] hover:bg-[#3F6B2F]"
                          onClick={(e) => handleEditSubmit(thread)}>
                          Save
                        </button>
                        <button
                          className="m-2 text-decoration-none btn btn-sm btn-success flex-row"
                        >Cancel</button>
                      </div>
                    )}
                    <div>
                      <Button
                        className="m-2 text-decoration-none btn btn-sm btn-success  bg-[#79A93D] hover:bg-[#3F6B2F] flex-row"
                        onClick={(e) => handleDeleteClick(thread)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div></>
                )}
                <p>{thread.date}</p>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
      </main>
    </>
  );
};
export default ForumPage;
