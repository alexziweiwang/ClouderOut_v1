

export function resourceRawListToUsableMap_vm(list, setMapFunc) {
    
    if (list === undefined) {
        setMapFunc({});
        return {};

    } else {
        let tempMap = {};

        let len = list.length;
        let i = 0;
        tempMap[''] = '';
        tempMap[""] = '';
        while (i < len) {
            let item = list[i];
            tempMap[item["var"]] = item["url"];
            i++;
        }

        setMapFunc(tempMap);

        return tempMap;

    }
}

export function dupObject(sourceObj) {
    let destObj = {};

    if (sourceObj !== undefined) {

        Object.keys(sourceObj).map((currKey) => {
            destObj[currKey] = sourceObj[currKey];

        });
    }

    return destObj;

}

export function dupNestedObject(sourceObj) {
    let destObj = {};

    if (sourceObj !== undefined) {

        Object.keys(sourceObj).map((currKey) => {
            let sourceItem = sourceObj[currKey];

            let destItem = {}
            Object.keys(sourceItem).map((itemKey) => {
                destItem[itemKey] = sourceItem[itemKey];
            });

            destObj[currKey] = destItem;

                    console.log("\t\t sourceItem === destItem ? ", sourceItem === destItem);

                    
        });
    }

    return destObj;

}

export function fromListToIndexedMap(list1) {
    let map1 = {};
    list1.map((item, index) => {
        map1[index] = item;
    });

    return map1;
}

export function fromIndexedMapToList(map1) {
    let list1 = [];
    Object.keys(map1).map((currKey) => {
        list1.push(map1[currKey]);
    });

    return list1;
}


export function replaceSpaceForNames(strProvided) {
    return strProvided.replaceAll(" ", "-");
}

export function generateNodeLongKeyString_vm({chapterKey, nodeKey}) {
    return chapterKey + "_" + nodeKey;
}

export function generateProjectOutputName_vm(projectName, authorName) {
    return "project#" + projectName +  "#by#" + authorName + "_";
}