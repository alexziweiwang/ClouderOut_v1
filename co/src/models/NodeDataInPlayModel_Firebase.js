import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 

import { generateNodeLongKeyString_vm } from '../viewmodels/PrepAc_ProjectOperation';




//fetch all-node-data by entire chapter
export async function fetchNodeDataEachChapter({projectName, uname, chapterKey}) {

          //TODO

          
                          console.log("check NodeDataInPlayModel_Firebase");
}



export async function fetchAllNodes2({projectName, uname}) {
//new data structure
    const q = query(
      collection(db, "user_projects", uname, "projects", projectName, "allNodes"));

    const querySnapshot = await getDocs(q);


    let dataMap = {};
    querySnapshot.forEach((doc) => {

                                      //  console.log("\t\t\tid = ", doc.id, " ... data  = ", doc.data());
        if (doc.id !== "placeholder123456789___###___###___##") {
          dataMap[doc.id] = doc.data();
              
        }

    });
                console.log("\t\tcloud side all-node-contents: ", dataMap);
    return dataMap;
}

export async function fetchNodeByChapter2({projectName, uname, chapterKey}) {
//new data structure
    const q = query(
      collection(db, "user_projects", uname, "projects", projectName, "allNodes"), 
      where("chapterKey", "==", chapterKey)
    );

    const querySnapshot = await getDocs(q);


    let dataMap = {};
    querySnapshot.forEach((doc) => {

                                      //  console.log("\t\t\tid = ", doc.id, " ... data  = ", doc.data());
        if (doc.id !== "placeholder123456789___###___###___##") {
          dataMap[doc.id] = doc.data();
              
        }

    });

    return dataMap;


}

export async function fetchNodeByNodeKey2({projectName, uname, chapterKey, nodeKey}) {
  let longKey = generateNodeLongKeyString_vm({chapterKey: chapterKey, nodeKey: nodeKey});

  const docRef = doc(db, "user_projects", uname, "projects", projectName, "allNodes", longKey);
  const docSnap = await getDoc(docRef);



  if (!docSnap.exists()) {
    return "node-dont-exist";
  }

  let nodeObj = docSnap.data();

  return nodeObj;


}