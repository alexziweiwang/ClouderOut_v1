

export function resourceRawListToUsableMap_vm(list, setMapFunc) {
    
    if (list === undefined) {
        setMapFunc({});
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

      }
}