import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export async function fetchChapterData({projectName, currUser}) {


    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        return;
    }

    let chapterNodeMappingObj = projectChapSnap.data().chapterNodeMapping;

    let chapterNodeGridBlocksArr = projectChapSnap.data().chapterNodeGridBlocks;
//TODO test

    let obj = {
        "chapterNodeMapping": hapterNodeMappingObj,
        "chapterNodeGridBlocks": chapterNodeGridBlocksArr
    }

    return obj;
}



export async function updateChapterToCloudData({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks}) {

    //TODO
    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);

                                console.log("model-func-updateChapterToCloudData-  ", chapterNodeMappingObj);


    if (!projectChapSnap.exists()) {
        return;
    }


    await updateDoc(projectChapRef, {
        "chapterNodeMapping": chapterNodeMappingObj,
        "chapterNodeGridBlocks": chapterNodeGridBlocks
    });
}


