import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const addCalculation = async(userId, calculation) => {
    try{
        const itemCol = collection(db, `users/${userId}/calculations`);
        const docRef = await addDoc(itemCol, calculation);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}