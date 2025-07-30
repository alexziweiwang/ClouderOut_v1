import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 



//fetch node-data by node-key
export async function fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey}) {

    let obj = {};

    const projectNodeRef = doc(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes", nodeKey);
    //TODO199: change sturcture: "chapters"-level should be the last collection-level: 
    //the docs should be each node (named as <chapterKey_nodeKey)
    
    const projectNodeSnap = await getDoc(projectNodeRef);
  
    if (!projectNodeSnap.exists()) {
      return {"node-not-exist": "node-not-exist"};
    }

    let nodeContentData = projectNodeSnap.data().nodeContent;
    let nodeUIData = projectNodeSnap.data().nodeUISettings;

    obj["nodeContent"] = nodeContentData;
    obj["nodeUISettings"] = nodeUIData;

            console.log("\t\t\tfetchNodeDataEachNode-func,   node all info = ", obj);


    return obj;

}

//fetch all-node-data by entire chapter
export async function fetchNodeDataEachChapter({projectName, uname, chapterKey}) {

    let dataMap = {};

    const q = query(collection(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes"));
    const querySnapshot = await getDocs(q);
    // for current chapter, its collection of nodes -- then details inside the nodes (docs in the sublevel)
    querySnapshot.forEach((doc) => {

                                      //  console.log("\t\t\tid = ", doc.id, " ... data  = ", doc.data());
            if (doc.id !== "placeholder123456789___###___###___##") {
              dataMap[doc.id] = doc.data();
              
            }

    });

    return dataMap;
}


