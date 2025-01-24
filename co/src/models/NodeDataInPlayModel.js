import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 


export async function fetchNodeDataEachNode({projectName, uname, chapterKey, nodeKey}) {

    let obj = {};

    const projectNodeRef = doc(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
    if (!projectNodeSnap.exists()) {
      return "node-not-exist";
    }

    let nodeContentData = projectNodeSnap.data().nodeContent;
    let nodeUIData = projectNodeSnap.data().nodeUISettings;

    obj["nodeContent"] = nodeContentData;
    obj["nodeUISettings"] = nodeUIData;

            console.log("\t\t\tfetchNodeDataEachNode-func,   node all info = ", obj);


    return obj;

}


export async function fetchNodeDataEachChapter({projectName, uname, chapterKey}) {

    let dataMap = {};

    const q = query(collection(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

                                        console.log("\t\t\tid = ", doc.id, " ... data  = ", doc.data());
            
            dataMap[doc.id] = doc.data();

    });

    return dataMap;
}