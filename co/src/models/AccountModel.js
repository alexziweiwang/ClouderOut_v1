import db from '../googleCloudConnetions';
import { doc, getDoc } from "firebase/firestore"; 

/**
 * Get project data by username.
 * 
 * @param {*} uname 
 * @returns fetched profiled data
 */
export async function getProjectGameData({uname}) {
    // fetch account information according to provided username
    const docRef = doc(db, "user_projects", uname);
    const docSnap = await getDoc(docRef);
  
    let profile = [];
    if (!docSnap.exists()) {
      return;
    }
    profile = docSnap.data();
    return profile;

}