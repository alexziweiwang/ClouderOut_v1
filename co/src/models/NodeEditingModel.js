import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 


export async function convNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj}) {
    
    const projectNodeRef = doc(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
    if (!projectNodeSnap.exists()) {
      return;
    }


    await updateDoc(projectRef, {
      "nodeContent": dataObj
    });
    
    //TODO



}

