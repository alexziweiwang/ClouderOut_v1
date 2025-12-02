
export function makeDeletionLists_vm(untrashedList, trashedList, setTrashedList, setUntrashedList, projName) {
    let projListTemp = untrashedList;
    let trashedProjListTemp = trashedList;

    trashedProjListTemp.push(projName);
    projListTemp = projListTemp.filter(
        (name) => name !== projName
    )

    setUntrashedList(projListTemp);
    setTrashedList(trashedProjListTemp);

    let objTemp = {
        "trashed": trashedProjListTemp,
        "untrashed": projListTemp
    }

    return objTemp;

}

export function makeReversionLists_vm(untrashedList, trashedList, setTrashedList, setUntrashedList, projName) {
    let projListTemp = untrashedList;
    let trashedProjListTemp = trashedList;

    projListTemp.push(projName);
    trashedProjListTemp = trashedProjListTemp.filter(
        (name) => name !== projName
    )

    setUntrashedList(projListTemp);
    setTrashedList(trashedProjListTemp);

    let objTemp = {
        "trashed": trashedProjListTemp,
        "untrashed": projListTemp
    }

    return objTemp;
}
