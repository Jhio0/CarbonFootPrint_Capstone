import { Threads } from "openai/resources/beta/threads/threads";
import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, remove, getDoc, where, updateDoc, deleteDoc } from "firebase/firestore";

export const addThread = async(userId, thread) => {
    try{
        if (userId !== null) {
            // console.log("Inside add threads");
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
            // console.log("Inside get threads");
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
    const itemCol = collection(db, `threads`);
    const querySnapshot = await getDocs(query(itemCol, where("date", "==", thread.date)))
    if (querySnapshot.size == 1) {
    const selectedDoc = querySnapshot.docs[0];
    await updateDoc(selectedDoc.ref, thread)
    }
    else {
        console.log("Error: Not exactly 1 match was found in snapshot")
    }
}

export const deleteThread = async(thread) => {
    const itemCol = collection(db, `threads`);
    const querySnapshot = await getDocs(query(itemCol, where("date", "==", thread.date)))
    if (querySnapshot.size == 1) {
    const selectedDoc = querySnapshot.docs[0];
    await deleteDoc(selectedDoc.ref); 
    }
    else {
        console.log("Error: Not exactly 1 match was found in snapshot")
    }
}