import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export async function fetchChapterData({projectName, currUser}) {


    const projectChapRef = doc(db, "user_projects", username, "projects", project);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        return;
    }

    let chapterNodeMappingObj = {};
    chapterNodeMappingObj = projectChapSnap.data().chapterNodeMapping;

    // let chapterNodeGridBlocks = []; //TODO refactor nested-arr
//TODO test

    return chapterNodeMappingObj;
}



export async function updateChapterToCloudData({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks}) {

    //TODO
    const projectChapRef = doc(db, "user_projects", username, "projects", project);
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


