import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc, writeBatch } from "firebase/firestore"; 
import { generateNodeLongKeyString_vm } from '../viewmodels/PrepAc_ProjectOperation';

export async function singleNodeWriteToCloud({project, username, chapterKey, nodeKey, dataObj}) {
  let longKey = generateNodeLongKeyString_vm({chapterKey: chapterKey, nodeKey: nodeKey});

  const docRef = doc(db, "user_projects", username, "projects", project, "allNodes", longKey);
  const docSnap = await getDoc(docRef);

                                console.log("singleNodeWriteToCloud-  ", dataObj, " for node - ", nodeKey, " ... as ", longKey);


  if (!docSnap.exists()) {
    return "node-dont-exist";
  }

  await setDoc(docRef, dataObj);


}


//get both node-content and node-ui-settings
export async function singleNodeGetFromCloud({project, username, chapterKey, nodeKey}) {
  let longKey = generateNodeLongKeyString_vm({chapterKey: chapterKey, nodeKey: nodeKey}); //TODO77777

  const docRef = doc(db, "user_projects", username, "projects", project, "allNodes", longKey);
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

export async function multipleNodeWriteToCloud({project, username, nodeCollection}) {
  const batch = writeBatch(db);

  const docRef = doc(db, "user_projects", username, "projects", project);

  Object.keys(nodeCollection).map((longNodeKey) => {
    let item = nodeCollection[longNodeKey];
    
    let refTemp = doc(docRef, "allNodes", longNodeKey);

    batch.set(refTemp, item);

  });

  await batch.commit();


}

export async function createNewNodeFolders({project, username, nodeList}) {
  const batch = writeBatch(db);

  const docRef = doc(db, "user_projects", username, "projects", project);

  nodeList.map((item, index) => {
    let keyStr = item["longKey"];
    let obj = item["objContent"];
                              /* for each item inside pendingNewNodeList:
                                let pair = {
                                    "longKey": longKey,
                                    "objContent": genObjBothParts
                                }
                              */
                                
    let refTemp = doc(docRef, "allNodes", keyStr);
    
    batch.set(refTemp, obj);

  });

  await batch.commit();

}




//     each elem in nodeKeyList: 
//         {
//         "nodeKey": newNodeKey,
//         "chapKey": chapterKeyTemp,
//         "detailObj": 
//         }
