import { Threads } from "openai/resources/beta/threads/threads";
import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, remove, getDoc, where } from "firebase/firestore";

export const addThread = async(userId, thread) => {
    try{
        if (userId !== null) {
            console.log("Inside add threads");
        const itemCol = collection(db, `threads`);
        const docRef = await addDoc(itemCol, thread);
        return docRef.id; 
        }
    }
    catch(error){
        console.log(error);
    }
}

// content, title, date (String), threadID

export const getThreads = async(userId) => {
    try{
        if (userId !== null) {
            console.log("Inside get threads");
        const itemCol = collection(db, `threads`);
        const querySnapshot = await getDocs(itemCol);
        const threads = [];
        querySnapshot.forEach((doc) => {
            threads.push({id: doc.id, ...doc.data()});
        });
        return threads;
        }
    }
    catch(error){
        console.log(error);
    }
}

export const editThread = async(thread) => {
    console.log(thread)
    const q = query(collection(db, 'threads'), where("date", "==", thread.date));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs.findIndex(0))
}