import { db } from "../_utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const editAccount = async(userId, account) => {
    try{
        const itemCol = collection(db, `users/${userId}/accounts`);
        const docRef = await addDoc(itemCol, account);
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}