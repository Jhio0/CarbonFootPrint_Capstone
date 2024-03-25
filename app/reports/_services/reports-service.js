import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const addReport = async(uid, report) => {
    try{
        const itemCol = collection(db, `users/${uid}/reports`);
        const docRef = await addDoc(itemCol, {
            title: report.title,
            text: report.text,
            date: report.date,
            location: report.location,
            private: report.private,
        });
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}

export const getReports = async(uid) => {
    try{
        const itemCol = collection(db, `users/${uid}/reports`);
        const querySnapshot = await getDocs(itemCol);
        const reports = [];
        querySnapshot.forEach((doc) => {
            reports.push({id: doc.id, ...doc.data()});
        });
        return reports;
    }
    catch(error){
        console.log(error);
    }
}

export const addPublicReport = async(uid, report) => {
    try{
        const itemCol = collection(db, `users/${uid}/Publicreports`);
        const docRef = await addDoc(itemCol, {
            title: report.title,
            text: report.text,
            date: report.date,
            location: report.location,
            private: report.private,
        });
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}