"use client"
// import React, { useState, useEffect } from "react";

// // import { useNavigate } from "react-router-dom";

// //Store all the posts created
// const threadList = [];

// const Home = () => {
//     const [thread, setThread] = useState("");
//     //const [threadList, setThreadList] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ thread });
//         setThread("");

//         //Check if user is authenticated, if not return to login.
//     //     const navigate = useNavigate();
//     //     useEffect(() => {
//     //     const checkUser = () => {
//     //         if (!localStorage.getItem("_id")) {
//     //             navigate("/");
//     //         } else {
//     //             console.log("Authenticated");
//     //         }
//     //     };
//     //     checkUser();
//     // }, [navigate]);

//     return <>{/*--the UI elements*/}</>;
//     };
//     return (
//         <>
       
//         <main className='home'>
//             <h2 className='homeTitle'>Create a Thread</h2>
//             <form className='homeForm' onSubmit={handleSubmit}>
//                 {/*--form UI elements--*/}
//             </form>

//             <div className='thread__container'>
//                 {threadList.map((thread) => (
//                     <div className='thread__item' key={thread.id}>
//                         <p>{thread.title}</p>
//                         <div className='react__container'>
//                             {/* <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
//                             <Comments
//                                 numberOfComments={thread.replies.length}
//                                 threadId={thread.id}
//                                 title={thread.title}
//                             /> */}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </main>
//     </>
//     );
// };

// //Send user ID + Post Title to server on submit.
// const createThread = () => {
//     fetch("http://localhost:4000/api/create/thread", {
//         method: "POST",
//         body: JSON.stringify({
//             thread,
//             userId: localStorage.getItem("_id"),
//         }),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             alert(data.message);
//             setThreadList(data.threads);
//         })
//         .catch((err) => console.error(err));
// };

// //Triggered when the form is submitted.
// const handleSubmit = (e) => {
//     e.preventDefault();
//     //Call the function.
//     createThread();
//     setThread("");
// };

// //Save post + send available posts to client display.
// app.post("/api/create/thread", async (req, res) => {
// const { thread, userId } = req.body;
// const threadId = generateID();

//     //Add post details to the array.
//     threadList.unshift({
//         id: threadId,
//         title: thread,
//         userId,
//         replies: [],
//         likes: [],
//     });

//     //Return a response containing the posts.
//     res.json({
//         message: "Thread created successfully!",
//         threads: threadList,
//     });
// });

// export default Home;

import React, { useState } from "react";
import express from "express";

const app = express();
app.use(express.json());

const threadList = [];

const Home = () => {
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        createThread(thread);
        setThread("");
    };

    return (
        <>
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={thread}
                        onChange={(e) => setThread(e.target.value)}
                    />
                    <button type="submit">Create</button>
                </form>

                <div className='thread__container'>
                    {threadList.map((thread) => (
                        <div className='thread__item' key={thread.id}>
                            <p>{thread.title}</p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

const createThread = (thread) => {
    fetch("/api/create/thread", {
        method: "POST",
        body: JSON.stringify({
            thread,
            userId: localStorage.getItem("_id"),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            // setThreadList(data.threads); // You might need to update threadList state here
        })
        .catch((err) => console.error(err));
};

app.post("/api/create/thread", (req, res) => {
    const { thread, userId } = req.body;
    const threadId = generateID();

    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: [],
    });

    res.json({
        message: "Thread created successfully!",
        threads: threadList,
    });
});

export default Home;