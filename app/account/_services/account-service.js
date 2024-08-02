import { db } from "../../_utils/firebase";
import { collection, getDocs, query, addDoc, setDoc, doc } from "firebase/firestore";

export const getAccount = async (userId) => {
  try {
    // Use the userId to reference the correct document in the accounts collection
    const docRef = doc(db, "accounts", userId);
    // Get the document data
    const docSnap = await getDoc(docRef);
    // Return the document data
    return docSnap.data();
  } catch (error) {
    console.error(error);
    throw error; // It's usually better to throw the error to let the caller handle it
  }
}

export const addAccount = async (userId, account) => {
    try {
      // Use the userId to reference the correct document in the accounts collection
      const docRef = doc(db, "accounts", userId);
      // Update or set the document with the new account data
      // setDoc will create the document if it does not exist, or overwrite it if it does
      await setDoc(docRef, account, { merge: true }); // Use { merge: true } to merge the data if the document already exists
      return userId; // Since we're using the userId as the document ID, return it directly
    } catch (error) {
      console.error(error);
      throw error; // It's usually better to throw the error to let the caller handle it
    }
  };