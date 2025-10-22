

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