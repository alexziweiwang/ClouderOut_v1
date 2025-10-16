

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