import {fetchProjectList, revertProject, 
    deleteProject, createProject, 
    initializeChaptersCollection, updateProjectUILang,
    fetchProjectUILang,
    updateProjectNavigationSettings,
    fetchProjectNavigationSettings,
    saveConvNodeUiPlan,
    fetchConvNodeUiAllPlans,
    addNewAccountFolder
} from '../models/ProjectManagerModel_Firebase';

const backendFlag = "firebase"; //TODO6000

/* Returns list of project names according to given parameter: untrashed or trashed */
export async function fetchProjectListVM({currUser, bkOption}) {

    let group = {"untrashed": {}, "trashed": {}};

    if (bkOption === "firebase") {
            const res = await fetchProjectList(currUser);
            
            if (res === undefined) {
                console.log("returned from model-func... undefined res for project-list");
                return;
            }

            //"res" contains both "untrashed" and "trashed" proj-names
            let resUntrashedArr = [];
            let resTrashedArr = [];
            res.forEach((doc) => {
                if (doc.data().trashed === false) {
                    resUntrashedArr.push(doc.id);
                } else {
                    resTrashedArr.push(doc.id);
                }
            });

            group = {"untrashed": resUntrashedArr, "trashed": resTrashedArr};
    }


    return group;
}

export async function revertProjectVM({projectToRevert, currUser, bkOption}) {

    if (bkOption === "firebase") {
        await revertProject({projectToRevert, currUser});
    }

}

export async function deleteProjectVM({projectToDelete, currUser, bkOption}) {

    if (bkOption === "firebase") {
        await deleteProject({projectToDelete, currUser});
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

export async function saveConvNodeUiPlanVM({projectName, currUser, updatedAllPlans, nodeType}) {
    //TODO5000 bk-imp

    if (backendFlag === "firebase") {
        await saveConvNodeUiPlan({projectName, currUser, updatedAllPlans, nodeType});
    }
}

export async function fetchConvNodeUiAllPlansVM({projectName, currUser, nodeType}) {
    let res = {};
   //TODO5000 bk-imp
 
    if (backendFlag === "firebase") {
        res = await fetchConvNodeUiAllPlans({projectName, currUser, nodeType});
    }

    return res;
}

export async function addNewAccountFolderVM({userId, username}) {
    
    let res = {};
   //TODO5000 bk-imp
 
    if (backendFlag === "firebase") {
        res = await addNewAccountFolder({userId, username});
    }
    return res;
}