import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"; 

export async function fetchChapterNodesData({projectName, currUser}) {


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
        return;
    }
    list = projectChapSnap.data().chapterList;


    //TODO test

    return list;
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
    });
}



export async function updateChapterListToCloud({projectName, currUser, chapterListData}) {

    const projectChapRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectChapSnap = await getDoc(projectChapRef);


    if (!projectChapSnap.exists()) {
        return;
    }

    await updateDoc(projectChapRef, {
        "chapterList": chapterListData,
    });

//TODO test

}


export async function addNewChapterFolders({project, username, chapterKeyList}) {
    const ref = doc(db, "user_projects", username, "projects", project);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return;
    }
  
    chapterKeyList.map(async (item, i) => {
  
      await setDoc(doc(ref, "chapters", item), {});
      
    });


}

export async function addNewOneChapterFolder({project, username, chapterKey}) {
    const ref = doc(db, "user_projects", username, "projects", project);

    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return;
    }

    await setDoc(doc(ref, "chapters", chapterKey), {})
    .then(
        await setDoc(
            doc(ref, "chapters", chapterKey, "nodes", "placeholder"), 
            {}
        )
    ); //works ok

}

  
  