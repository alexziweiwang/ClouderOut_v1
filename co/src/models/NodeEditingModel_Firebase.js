import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 
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
      let longKey = generateNodeLongKeyString_vm({chapterKey: item["chapKey"], nodeKey: item["nodeKey"]});


      if (item["chapKey"] === chapterKey) {
          console.log();

          await setDoc(
              doc(ref, "allNodes", longKey), 
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