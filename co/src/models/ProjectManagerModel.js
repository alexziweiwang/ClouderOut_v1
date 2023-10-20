import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore"; 

export async function fetchProjectList() {
  const currUser = "user002"; //TODO to-change

  console.log("model: fetch project list ...");
  
  const docRef = doc(db, "user_projects", currUser);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const q = query(collection(docRef, "projects"));
  const querySnapshot = await getDocs(q);
  let projectArr = [];
  querySnapshot.forEach((doc) => {
    projectArr.push(doc.id);
  });

  console.log("arr:", projectArr); //TODO testing: list of projects for user002
}


