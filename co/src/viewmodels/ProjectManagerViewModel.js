import {
    fetchProjectList, 
    revertProject, 
    markTrashProject, 
    createProject, 

    initializeChaptersCollection, 
    updateProjectUILang,
    fetchProjectUILang,
    updateProjectNavigationSettings,
    fetchProjectNavigationSettings,
    saveConvNodeUiPlan,
    fetchConvNodeUiAllPlans,
    addNewAccountFolder,
    fetchProjectAllMetadata,
    removeProjectPermanently
} from '../models/ProjectManagerModel_Firebase';

import { placeholderNameDefault } from '../components/_dataStructure_DefaultObjects';


/* Returns list of project names according to given parameter: using or trashed */
export async function fetchProjectListVM({currUser, bkOption, setValueFunc}) {

    let groupObj = {"using": {}, "trashed": {}};

    if (currUser === "_") {
        return groupObj;
    }


    if (bkOption === "firebase") {
            await fetchProjectList(currUser).then((res)=>{

                if (res === undefined) {
                                            console.log("returned from model-func... undefined res for project-list");
                    return groupObj;
                }
                                                        console.log("\t vm, splitting proj-lists");
    
                                    //"res" contains both "using" and "trashed" proj-names
                                    // let resusingArr = [];
                                    // let resTrashedArr = [];

                let resMapping = {};

                res.forEach((doc) => {
                    resMapping[doc.id] = doc.data().trashed;
                                                // if (doc.data().trashed === false) {
                                                //     resusingArr.push(doc.id);
                                                    
                                                // } else {
                                                //     resTrashedArr.push(doc.id);
                                                // }
                });
                                
                                            // groupObj = {
                                            //     "using": resusingArr, 
                                            //     "trashed": resTrashedArr
                                            // };
                                                    //               console.log("\t\tvm: res = ", groupObj);

                                            //setValueFunc(groupObj);
                setValueFunc(resMapping);

            });
            

    }


    
}

export async function revertProjectVM({projectToRevert, currUser, bkOption}) {

    if (bkOption === "firebase") {
        await revertProject({projectToRevert, currUser});
    }

}

export async function markTrashProjectVM({projectToMarkTrash, currUser, bkOption}) {

    if (bkOption === "firebase") {
        await markTrashProject({projectToMarkTrash, currUser});
    }

}

export async function removeProjectPermanentlyVM({projectToRemove, currUser, bkOption}) {
    if (bkOption === "firebase") {
        await removeProjectPermanently({projectToRemove, currUser});
    }
}

export async function createProjectVM({currUser, projectName, projectObj, bkOption}) {

    if (bkOption === "firebase") {
        await createProject({currUser, projectName, projectObj});
    }

}

export async function updateProjectUILangVM({projectName, currUser, selectedUILang, bkOption}) {

    if (bkOption === "firebase") {
        await updateProjectUILang({projectName, currUser, selectedUILang});
    }

}

export async function fetchProjectUILangVM({projectName, currUser, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchProjectUILang({projectName, currUser});
    }

    return res;
}

export async function updateProjectNavigationSettingsVM({projectName, currUser, dataObj, bkOption}) {

    if (bkOption === "firebase") {
        await updateProjectNavigationSettings({projectName, currUser, dataObj});
    }

}


export async function fetchProjectNavigationSettingsVM({projectName, currUser, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await fetchProjectNavigationSettings({projectName, currUser});
    }

    return res;
}

export async function saveConvNodeUiPlanVM({projectName, currUser, updatedAllPlans, nodeType, bkOption}) {

    if (bkOption === "firebase") {
        await saveConvNodeUiPlan({projectName, currUser, updatedAllPlans, nodeType});
    }
}

export async function fetchConvNodeUiAllPlansVM({projectName, currUser, nodeType, bkOption}) {
    let res = {};
 
    if (bkOption === "firebase") {
        res = await fetchConvNodeUiAllPlans({projectName, currUser, nodeType});
    }

    return res;
}

export async function addNewAccountFolderVM({userId, username, userEmailAddr, bkOption}) {    
    let res = {};
 
    if (bkOption === "firebase") {
        res = await addNewAccountFolder({userId, username, userEmailAddr});
    }
    return res;
}

