
export function makeDeletionLists_vm(untrashedList, trashedList, projName) {
    let projListTemp = untrashedList;
    let trashedProjListTemp = trashedList;

    trashedProjListTemp.push(projName);
    projListTemp = projListTemp.filter(
        (name) => name !== projName
    )
 
    let objTemp = {
        "trashed": trashedProjListTemp,
        "untrashed": projListTemp
    }

    return objTemp;

}

export function makeReversionLists_vm(untrashedList, trashedList, projName) {
    let projListTemp = untrashedList;
    let trashedProjListTemp = trashedList;

    projListTemp.push(projName);
    trashedProjListTemp = trashedProjListTemp.filter(
        (name) => name !== projName
    )

    let objTemp = {
        "trashed": trashedProjListTemp,
        "untrashed": projListTemp
    }

    return objTemp;
}
