

export function resourceVarToUrl_vm(list, varName) {

    console.log("resource-var-to-url", list);

    if (list === undefined) {
        return "";
    }
    
    let filteredList = list.filter(e => e["var"] == varName);
    if (filteredList.length > 0) {
        return filteredList[0]["url"];
    } else {
        return "";
    }
}

export function indexedMapToRealArray_vm(indexedMap) {
    console.log("indexed map, before: ", indexedMap);

    let len = Object.keys(indexedMap).length;
    let i = 0;

    let resList = [];
    for (i = 0; i < len; i++) {
        resList.push(indexedMap[i]);
    }

    return resList;

}
