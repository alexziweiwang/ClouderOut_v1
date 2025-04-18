import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 


export async function convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj}) {
    
    const projectNodeRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
                                  console.log("model-func-convSingleNodeUpdateToCloud-  ", dataObj, " for node - ", nodeKey);


    if (!projectNodeSnap.exists()) {
      return "node-not-exist";
    }


    await updateDoc(projectNodeRef, {
      "nodeContent": dataObj,
      "nodeUISettings": uiDataObj
    });

    return "node-update-ok";
    
    //TODO test


}



export async function convNodeBothPartsFromCloud({project, username, chapterKey, nodeKey}) {
  const projectNodeRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey, "nodes", nodeKey);
  const projectNodeSnap = await getDoc(projectNodeRef);

  if (!projectNodeSnap.exists()) {
    return;
  }


  let bothObj = [];
  bothObj = projectNodeSnap.data(); 

    //TODO test

  return bothObj;
}



export async function addNewNodeFolders({project, username, nodeList, chapterKey}) {

    const ref = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return;
    }

                        //TODO group func       group-func
    nodeList.map(async (item, i) => {
        let currNodeKey = item["nodeKey"];

        if (item["chapKey"] === chapterKey) {
          console.log();

          await setDoc(
            doc(ref, "nodes", currNodeKey), 
            item["detailObj"]
          );
          //TODO600 test!!

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