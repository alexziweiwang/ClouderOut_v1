import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

/**
 * Get project data by username.
 * 
 * @param {*} uname username
 * @returns fetched profiled data
 */
export async function getProjectInfo({uname}) {
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

export async function getUserDefaultUILang({uname}) {
  const docRef = doc(db, "user_projects", uname);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }
  let profile = docSnap.data();
  if (profile === undefined) {
    return "";
  } else {
    return profile.default_ui_language;
  }

}

export async function updateUserDefaultUILang({uname, newUILang}) {
  const docRef = doc(db, "user_projects", uname);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  await updateDoc(docSnap, {default_ui_language: newUILang});


}