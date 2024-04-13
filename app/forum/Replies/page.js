"use client"
import React, { useState } from "react";

const Replies = () => {
    
    const [reply, setReply] = useState([]);
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    const handleSubmitReply = (e) => {
        e.preventDefault();
        // console.log({ reply });
        setReply("");

        // Ensure user is authenticated
        if (!user) {
         console.error('User is not authenticated.');
         return;
         }
            
        const reply= {
        content: content,
         date: "",
         author: author
         };
    };

    //POST reply to db.
    //GET reply from db.
    //MAP through replies collection from db to populate front end. 
    //Max limit of replies displayed, populate new pages with overlow replies. 

    return (
        <main className='replies'>
            <form className='modal__content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Reply to the thread</label>
                <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    type='text'
                    name='reply'
                    className='modalInput'
                />

                <button className='modalBtn'
                 onClick={addReply}>SEND</button>
            </form>
        </main>
    );
};

export default Replies;