import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection } from "firebase/firestore"; 

export async function fetchProjectList() {
  console.log("model: fetch project list ...");
  
  const querySnapshot = await getDocs(collection(db, "user_projects"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
}


