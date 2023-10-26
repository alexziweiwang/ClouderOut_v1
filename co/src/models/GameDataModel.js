import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"; 

export async function getProjectGameData({projectName, uname}) {
  const docRef = doc(db, "user_projects", uname);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }

  const q = query(collection(docRef, "projects"), where("project_name", "==", projectName));
  const querySnapshot = await getDocs(q);
  let dataFetched;
  querySnapshot.forEach((doc) => {
    dataFetched = doc.data(); 
      console.log("dataFetched:", dataFetched); //TODO testing
  });    
  return dataFetched;

}


