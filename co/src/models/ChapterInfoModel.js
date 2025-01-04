import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export async function fetchChapterData({projectName, currUser}) {

    let dataObj = {};

    const projectChapRef = doc(db, "user_projects", username, "projects", project);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        return;
    }

    dataObj = projectChapSnap.data().chapterInfo;
//TODO test

    return dataObj;
}

export async function addNewChapterToCloudData({projectName, currUser, dataObj}) {

}

export async function updateChapterToCloudData({projectName, currUser, dataObj}) {
//TODO
    const projectChapRef = doc(db, "user_projects", username, "projects", project);
    const projectChapSnap = await getDoc(projectChapRef);

                                console.log("model-func-updateChapterToCloudData-  ", dataObj);


    if (!projectChapSnap.exists()) {
        return;
    }


    await updateDoc(projectChapRef, {
        "chapterInfo": dataObj
    });
}