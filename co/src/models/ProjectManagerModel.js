import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore"; 

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

export async function revertProject(projectToRevert) {
    const currUser = "user002"; //TODO to-change

    const docRef = doc(db, "user_projects", currUser);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    const projRef = doc(docRef, "projects", projectToRevert);
    await updateDoc(projRef, {trashed: false});
    
}

export async function deleteProject(projectToDelete) {
  //delete project by name
  const currUser = "user002"; //TODO to-change

  const docRef = doc(db, "user_projects", currUser);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const projRef = doc(docRef, "projects", projectToDelete);
  await updateDoc(projRef, {trashed: true});
  
}