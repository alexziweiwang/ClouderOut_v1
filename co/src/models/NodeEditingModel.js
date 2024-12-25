import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 


export async function convNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj}) {
    
    const projectNodeRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
    if (!projectNodeSnap.exists()) {
      return;
    }


    await updateDoc(projectRef, {
      "nodeContent": dataObj
    });
    
    //TODO test



}


export async function convNodeFetchFromCloud({project, username, chapterKey, nodeKey}) {
    
  const projectNodeRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey, "nodes", nodeKey);
  const projectNodeSnap = await getDoc(projectNodeRef);

  if (!projectNodeSnap.exists()) {
    return;
  }


  let projectNodeData = [];
  projectNodeData = projectNodeSnap.data().nodeContent; 

    //TODO test

  return projectNodeData;


}
