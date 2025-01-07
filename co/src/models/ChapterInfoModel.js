import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export async function fetchChapterNodesData({projectName, currUser}) {


    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        return;
    }

    let chapterNodeMappingObj = projectChapSnap.data().chapterNodeMapping;

    let chapterNodeGridBlocksArr = projectChapSnap.data().chapterNodeGridBlocks;
//TODO test

    let obj = {
        "chapterNodeMapping": chapterNodeMappingObj,
        "chapterNodeGridBlocks": chapterNodeGridBlocksArr
    }

    return obj;
}


export async function fetchAllChapterList({projectName, currUser}) {

    //TODO
}


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
        "chapterNodeGridBlocks": chapterNodeGridBlocks
    });
}





export async function updateChapterListToCloud({projectName, currUser, chapterList}) {
//TODO
}