import { Threads } from "openai/resources/beta/threads/threads";
import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const addThread = async(userId, thread) => {
    try{
        const itemCol = collection(db, `users/${userId}/threads`);
        const docRef = await addDoc(itemCol, thread);
        // thread.threadId = docRef;
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}

// content, title, date (String), threadID

export const getThreads = async(userId) => {
    try{
        const itemCol = collection(db, `users/${userId}/threads`);
        const querySnapshot = await getDocs(itemCol);
        const threads = [];
        querySnapshot.forEach((doc) => {
            threads.push({id: doc.id, ...doc.data()});
        });
        return threads;
    }
    catch(error){
        console.log(error);
    }
}

export const editThread = async(userID) => {
    try {
        const itemCol = collection(db, `users/${userId}/threads`);
        const querySnapshot = await getDocs(itemcol, );
    }
    catch (error){
        console.log(error);
    }
}