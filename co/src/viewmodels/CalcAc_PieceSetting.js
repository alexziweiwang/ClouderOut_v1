

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
