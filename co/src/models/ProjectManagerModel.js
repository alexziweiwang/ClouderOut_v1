import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore"; 


/**
 * Get the list of project names of the user
 * 
 * @param {*} currUser 
 * @returns list of project names
 */
export async function fetchProjectList(currUser) {

  console.log("*from cloud*: model - fetch project list ...");
  
  const docRef = doc(db, "user_projects", currUser);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const q = query(collection(docRef, "projects"), where("type", "!=", "rm"));
  const querySnapshot = await getDocs(q);
  let projectArr = [];
  querySnapshot.forEach((doc) => {
    projectArr.push(doc);
  });
  return projectArr;
}

/**
 * Revert deleted proejct to using
 * 
 * @param {*} projectToRevert 
 * @param {*} currUser 
 * @returns void
 */
export async function revertProject(projectToRevert, currUser) {

    const docRef = doc(db, "user_projects", currUser);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    const projRef = doc(docRef, "projects", projectToRevert);
    await updateDoc(projRef, {trashed: false});
    
}

/**
 * Set specified project to deleted
 * 
 * @param {*} projectToDelete 
 * @param {*} currUser 
 * @returns void
 */
export async function deleteProject(projectToDelete, currUser) {
  //delete project by name
  const docRef = doc(db, "user_projects", currUser);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const projRef = doc(docRef, "projects", projectToDelete);
  await updateDoc(projRef, {trashed: true});
  
}