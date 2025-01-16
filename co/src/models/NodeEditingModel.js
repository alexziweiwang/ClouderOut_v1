import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 


export async function convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj}) {
    
    const projectNodeRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
                                  console.log("model-func-convSingleNodeUpdateToCloud-  ", dataObj, " for node - ", nodeKey);


    if (!projectNodeSnap.exists()) {
      return "node-not-exist";
    }


    await updateDoc(projectNodeRef, {
      "nodeContent": dataObj
    });

    return "node-update-ok";
    
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
          console.log("model-func fetch piece-data-from cloud ... res = ", projectNodeData);

  return projectNodeData;


}



export async function addNewNodeFolders({project, username, nodeKeyList, chapterKey}) {
  //TODO

    const projectChapterRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey);
    const projectChapterSnap = await getDoc(projectChapterRef);

    if (!projectChapterSnap.exists()) {
      return;
    }


    // for each node in currChapList, call model-func
    nodeKeyList.map(async (item, i) => {
        let currNode = item["nodeKey"];
        if (item["chapKey"] === "chapterKey") {

          //TODO add this doc
          await addDoc(projectChapterRef, currNode);
        
        }
    });

    /*
    each elem in nodeKeyList: 
        {
        "nodeKey": newNodeKey,
        "chapKey": chapterKeyTemp
        }

    */




}