import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"; 

export async function fetchProjectList() {
  const currUser = "user002"; //TODO to-change

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
    //TODO db cloud: change project's field value (become untrashed)
}