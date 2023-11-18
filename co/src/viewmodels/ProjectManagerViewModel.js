import {fetchProjectList, revertProject, deleteProject} from '../models/ProjectManagerModel';

/* Returns list of project names according to given parameter: untrashed or trashed */
export async function fetchProjectListVM() {
    
    const res = await fetchProjectList();
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

export async function revertProjectVM(projectToRevert) {
    await revertProject(projectToRevert);
}

export async function deleteProjectVM(projectToDelete) {
    await deleteProject(projectToDelete);
}