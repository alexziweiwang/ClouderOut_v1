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



export async function addNewChapterFolders({project, username, chapterKeyList}) {
                                            // const ref = doc(db, "user_projects", username, "projects", project);
                                            // const snap = await getDoc(ref);
                                            // if (!snap.exists()) {
                                            //   return;
                                            // }
                                        
                                            // chapterKeyList.map(async (item, i) => {
                                        
                                            //   await setDoc(doc(ref, "chapters", item), {});
                                            //       //TODO199: change sturcture: chapters-level should be the last collection-level: 

                                            // });


}

export async function addNewOneChapterFolder({project, username, chapterKey}) {
                                            // const ref = doc(db, "user_projects", username, "projects", project);

                                            // const snap = await getDoc(ref);
                                            // if (!snap.exists()) {
                                            //   return;
                                            // }


                                            //       //TODO199: change sturcture: chapters-level should be the last collection-level: 
                                            // await setDoc(doc(ref, "chapters", chapterKey), {})
                                            // .then(
                                            //     await setDoc(
                                            //         doc(ref, "chapters", chapterKey, "nodes", "placeholder123456789___###___###___##"), 



                                            //         {}
                                            //     )
                                            // ); //works ok
                                            //       //TODO199: change sturcture: chapters-level should be the last collection-level: 

}

  
  