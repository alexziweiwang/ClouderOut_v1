import {fetchProjectList, revertProject, deleteProject, createProject, initializeChaptersCollection } from '../models/ProjectManagerModel';

/* Returns list of project names according to given parameter: untrashed or trashed */
export async function fetchProjectListVM(currUser) {
    
    const res = await fetchProjectList(currUser);
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

    const group = {untrashed: resUntrashedArr, trashed: resTrashedArr};

    return group;

}

export async function revertProjectVM(projectToRevert, currUser) {
    await revertProject(projectToRevert, currUser);
}

export async function deleteProjectVM(projectToDelete, currUser) {
    await deleteProject(projectToDelete, currUser);
}

export async function createProjectVM(currUser, projectName, projectObj) {
    await createProject(currUser, projectName, projectObj);
}
