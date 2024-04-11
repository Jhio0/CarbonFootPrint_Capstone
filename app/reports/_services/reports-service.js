import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc  } from "firebase/firestore";

export const addReport = async(userId, report) => {
    try{
        const itemCol = collection(db, `users/${userId}/reports`);
        const docRef = await addDoc(itemCol, report);
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}

export const getReports = async(userId) => {
    try{
        const itemCol = collection(db, `users/${userId}/reports`);
        const querySnapshot = await getDocs(itemCol);
        const reports = [];
        console.log("read reports");
        querySnapshot.forEach((doc) => {
            reports.push({id: doc.id, ...doc.data()});
        });
        return reports;
    }
    catch(error){
        console.log(error);
    }
}

export const addPublicReport = async (uid, report) => { 
    try {
        const itemCol = collection(db, "publicReports",);
        const docRef = await addDoc(itemCol, report);
        return docRef.id;
    } catch (error) {
        console.error("Error adding public report:", error);
        throw error;  
    }
}

export const getPublicReports = async () => {
    try {
        const publicReportsCol = collection(db, "publicReports");
        const querySnapshot = await getDocs(publicReportsCol);
        const reports = [];
        querySnapshot.forEach((doc) => {
            reports.push({ id: doc.id, ...doc.data() });
        });
        return reports;
    } catch (error) {
        console.error("Error getting public reports:", error);
        throw error;
    }
};

export const deletePublicReport = async (reportId) => {
    try {
        const publicReportDoc = doc(db, "publicReports", reportId);
        await deleteDoc(publicReportDoc);
    } catch (error) {
        console.error("Error deleting public report:", error);
        throw error;
    }
};


export const deleteReport = async (userId, reportId) => {
    try {
        const userReportDoc = doc(db, `users/${userId}/reports`, reportId);
        await deleteDoc(userReportDoc);
    } catch (error) {
        console.error("Error deleting user report:", error);
        throw error;
    }
};