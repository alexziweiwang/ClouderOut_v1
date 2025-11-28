import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"; 

export async function fetchChapterNodeMapping({projectName, currUser}) {


    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        return;
    }

    let chapterNodeMappingObj = projectChapSnap.data().chapterNodeMapping;


    let obj = {
        "chapterNodeMapping": chapterNodeMappingObj,
    }

    return obj;
}

export async function fetchAllChapterList({projectName, currUser}) {
    let list = [];
    
    
    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        console.log("\t\t\tmodel-func fetch-all-chapter-list problem", projectName, "-" ,currUser);
        return;
    }
    list = projectChapSnap.data().chapterList;


    //TODO test

    return list;
}

//updates chapter's node-mapping
export async function updateChapterNodesToCloudData({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks}) {

    //TODO
    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);

                                console.log("model-func-updateChapterNodesToCloudData-  ", chapterNodeMappingObj);


    if (!projectChapSnap.exists()) {
        return;
    }


    await updateDoc(projectChapRef, {
        "chapterNodeMapping": chapterNodeMappingObj,
    });
}

