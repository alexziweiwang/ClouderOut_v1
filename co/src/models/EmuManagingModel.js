import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 



export async function fetchEmuData1Gdt({projectName, currUser}) {
    console.log("model - fetchEmuData1Gdt");
    let obj = {};
    //TODO
    return obj;

}

export async function fetchEmuData2Epp({projectName, currUser}) {
    console.log("model - fetchEmuData2Epp");
    let obj = {};
    //TODO
    return obj;
}

export async function fetchEmuData3Epa({projectName, currUser}) {
    console.log("model - fetchEmuData3Epa");
    let obj = {};
    //TODO
    return obj;
}

export async function fetchEmuData4Ess({projectName, currUser}) {
    console.log("model - fetchEmuData4Ess");
    let obj = {};
    //TODO
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