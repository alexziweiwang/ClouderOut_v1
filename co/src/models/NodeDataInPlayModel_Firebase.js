import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 



//fetch node-data by node-key
export async function fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey}) {

                          // let obj = {};

                          // const projectNodeRef = doc(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes", nodeKey);
                          //       //TODO199: change sturcture: chapters-level should be the last collection-level: 
                          // //the docs should be each node (named as <chapterKey_nodeKey)
                          
                          // const projectNodeSnap = await getDoc(projectNodeRef);
                        
                          // if (!projectNodeSnap.exists()) {
                          //   return {"node-dont-exist": "node-dont-exist"};
                          // }

                          // let nodeContentData = projectNodeSnap.data().nodeContent;
                          // let nodeUIData = projectNodeSnap.data().nodeUISettings;

                          // obj["nodeContent"] = nodeContentData;
                          // obj["nodeUISettings"] = nodeUIData;

                          //         console.log("\t\t\tfetchNodeDataEachNode-func,   node all info = ", obj);


                          // return obj;
                          console.log("check NodeDataInPlayModel_Firebase");

}

//fetch all-node-data by entire chapter
export async function fetchNodeDataEachChapter({projectName, uname, chapterKey}) {

                          // let dataMap = {};


                          //       //TODO199: change sturcture: chapters-level should be the last collection-level: 
                          // const q = query(collection(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes"));
                          // const querySnapshot = await getDocs(q);
                          // // for current chapter, its collection of nodes -- then details inside the nodes (docs in the sublevel)
                          // querySnapshot.forEach((doc) => {

                          //                                   //  console.log("\t\t\tid = ", doc.id, " ... data  = ", doc.data());
                          //         if (doc.id !== "placeholder123456789___###___###___##") {
                          //           dataMap[doc.id] = doc.data();
                                    
                          //         }

                          // });

                          // return dataMap;

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