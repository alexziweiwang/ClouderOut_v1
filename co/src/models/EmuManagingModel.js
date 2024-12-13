import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 



export async function fetchEmuData1Gdt({projectName, currUser}) {
    let obj = {};

    if (projectName === "" || projectName === undefined) {
        return;
    }
    const projectRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
        return;
    }

    obj = projectSnap.data().emu4sets.gdt1; 

                            console.log("model - fetchEmuData1Gdt", obj); //TODO test

    return obj;

}

export async function fetchEmuData2Epp({projectName, currUser}) {
    let obj = {};

    if (projectName === "" || projectName === undefined) {
        return;
    }
    const projectRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
        return;
    }

    obj = projectSnap.data().emu4sets.epp2; 

                            console.log("model - fetchEmuData2Epp", obj); //TODO test

    return obj;
}

export async function fetchEmuData3Epa({projectName, currUser}) {
    let obj = {};
    if (projectName === "" || projectName === undefined) {
        return;
    }
    const projectRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
        return;
    }

    obj = projectSnap.data().emu4sets.epa3; 

                                        console.log("model - fetchEmuData3Epa: ", obj);


    return obj;
}

export async function fetchEmuData4Ess({projectName, currUser}) {
    let obj = {};
    if (projectName === "" || projectName === undefined) {
        return;
    }
    const projectRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
        return;
    }

    obj = projectSnap.data().emu4sets.ess4; 

                                    console.log("model - fetchEmuData4Ess: ", obj);

    return obj;
}

export async function fetchEmuData5Shp({projectName, currUser}) {
    let obj = {};
    if (projectName === "" || projectName === undefined) {
        return;
    }
    const projectRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
        return;
    }

    obj = projectSnap.data().emu4sets.shp5; 
    

                                    console.log("model - fetchEmuData4Ess: ", obj);

    return obj;
}




export async function updateAllSets({projectName, currUser, dataObj}) {
                                                        //console.log("model-updateAllSets-func:", dataObj); //TODO test

    const projectRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projectRef);
  
    if (!projectSnap.exists()) {
      return;
    }
    await updateDoc(projectRef, {
      "emu4sets": dataObj
    });

}