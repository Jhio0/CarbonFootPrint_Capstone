import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const addReport = async(uid, report) => {
    try{
        const itemCol = collection(db, `users/${uid}/reports`);
        const docRef = await addDoc(itemCol, report);
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

export const publicProfile = async () => {
    try {
        const publicReportsCol = collection(db, "publicReports");
        const querySnapshot = await getDocs(publicReportsCol);
        const profiles = {};

        querySnapshot.forEach((doc) => {
            const reportData = doc.data();
            const uid = reportData.uid;

            if (!profiles[uid]) {
                // If the UID is not already in the profiles object, create a new entry
                profiles[uid] = [reportData];
            } else {
                // If the UID is already in the profiles object, push the reportData to the existing array
                profiles[uid].push(reportData);
            }
        });

        return profiles;
    } catch (error) {
        console.error("Error getting public profiles:", error);
        throw error;
    }
};