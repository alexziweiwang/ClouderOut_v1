import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 

//update node-content + node-ui-settings
export async function convSingleNodeUpdateToCloud({project, username, chapterKey, nodeKey, dataObj, uiDataObj, nodeType}) {
    
    const projectNodeRef = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
                                  console.log("model-func-convSingleNodeUpdateToCloud-  ", dataObj, " for node - ", nodeKey);


    if (!projectNodeSnap.exists()) {
      return "node-not-exist";
    }

    await updateDoc(projectNodeRef, {
      "nodeContent": dataObj,
      "nodeUISettings": uiDataObj,
      "nodeType": nodeType
    });

    return "node-update-ok";
    
    //TODO test


}


//get both node-content and node-ui-settings
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


//for locally-added nodes, add these to cloud?  //TODOtest later
export async function addNewNodeFolders({project, username, nodeList, chapterKey}) {

    const ref = doc(db, "user_projects", username, "projects", project, "chapters", chapterKey);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return;
    }

    //TODO99999
    //new strategy: chapterKey_nodeKey

    const batch = db.batch();

    let docList = []; // each item is one document to add
    
    //TODO according to node-list, make the doc-list
    nodeList.map((item, i) => {
      let obj = {};
      //TODO


    });


    docList.forEach(data => {
      const newDocRef = ref.doc();
      batch.set(newDocRef, data);
    });


                                                            //                     //TODO group func       group-func
                                                            // nodeList.map(async (item, i) => {
                                                            //     let currNodeKey = item["nodeKey"];

                                                            //     if (item["chapKey"] === chapterKey) {
                                                            //       console.log();

                                                            //       await setDoc(
                                                            //         doc(ref, "nodes", currNodeKey), 
                                                            //         item["detailObj"]
                                                            //       );
                                                            //       //TODO600 test!!

                                                            //     }
                                                            // });


    /*
    each elem in nodeKeyList: 
        {
        "nodeKey": newNodeKey,
        "chapKey": chapterKeyTemp
        }

    */




}