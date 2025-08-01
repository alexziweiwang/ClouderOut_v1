import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 
import { generateNodeLongKeyString_vm } from '../viewmodels/PrepAc_ProjectOperation';

//update node-content + node-ui-settings
export async function convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj, nodeType}) {

              //TODO199: change sturcture: chapters-level should be the last collection-level: 
    const docRef = doc(db, "user_projects", username, "projects", project, "allNodes", nodeKey);
    const docSnap = await getDoc(docRef);
  
                                  console.log("model-func-convSingleNodeUpdateToCloud-  ", dataObj, " for node - ", nodeKey);


    if (!docSnap.exists()) {
      return "node-not-exist";
    }

    await updateDoc(docRef, {
      "nodeContent": dataObj,
      "nodeUISettings": uiDataObj,
      "nodeType": nodeType,
      "chapterKey": chapterKey,
      "nodeKey": nodeKey
    });

    return "node-update-ok";
    
    //TODO test


}


//get both node-content and node-ui-settings
export async function convNodeBothPartsFromCloud({project, username, nodeKey}) {
  const docRef = doc(db, "user_projects", username, "projects", project, "allNodes", nodeKey);
          //TODO199: change sturcture: chapters-level should be the last collection-level: 
  
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return;
  }


  let bothObj = [];
  bothObj = docSnap.data(); 

    //TODO test

  return bothObj;
}


//for locally-added nodes, add these to cloud?  //TODOtest later
export async function addNewNodeFolders({project, username, nodeList, chapterKey}) {

    const ref = doc(db, "user_projects", username, "projects", project, "allNodes");
          //TODO199: change sturcture: chapters-level should be the last collection-level: 
    
    
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return;
    }
                                                                                //TODO group func       group-func
    nodeList.map(async (item, i) => {
      let nodeKeyName = item["nodeKey"];

      if (item["chapKey"] === chapterKey) {
          console.log();

          await setDoc(
              doc(ref, "allNodes", nodeKeyName), 
              item["detailObj"]
          );
        //TODO600 test!!

      }
    });


    /*
    each elem in nodeKeyList: 
        {
        "nodeKey": newNodeKey,
        "chapKey": chapterKeyTemp,
        "detailObj": 
        }

    */




}