import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 
import { generateNodeLongKeyString_vm } from '../viewmodels/PrepAc_ProjectOperation';

//update node-content + node-ui-settings
export async function convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj, nodeType}) {
    let keyStr = generateNodeLongKeyString_vm({chapterKey: chapterKey, nodeKey: nodeKey});


              //TODO199: change sturcture: chapters-level should be the last collection-level: 
    const projectNodeRef = doc(db, "user_projects", username, "projects", project, "allNodes", keyStr);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
                                  console.log("model-func-convSingleNodeUpdateToCloud-  ", dataObj, " for node - ", keyStr);


    if (!projectNodeSnap.exists()) {
      return "node-not-exist";
    }

    await updateDoc(projectNodeRef, {
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
export async function convNodeBothPartsFromCloud({project, username, chapterKey, nodeKey}) {
  const projectNodeRef = doc(db, "user_projects", username, "projects", project, "allNodes");
          //TODO199: change sturcture: chapters-level should be the last collection-level: 
  
  const projectNodeSnap = await getDoc(projectNodeRef);

  if (!projectNodeSnap.exists()) {
    return;
  }


  let bothObj = [];
  bothObj = projectNodeSnap.data(); 

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
      let keyStr =  generateNodeLongKeyString_vm({
        chapterKey: item["chapKey"], 
        nodeKey: item["nodeKey"]
      });


      if (item["chapKey"] === chapterKey) {
          console.log();

          await setDoc(
              doc(ref, "allNodes", keyStr), 
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