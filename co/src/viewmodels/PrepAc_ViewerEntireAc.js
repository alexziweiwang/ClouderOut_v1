

export function initializeGameDataTracker_vm(dataObj, setPlayerGameDataTracker) {

    let objTemp = {};
    Object.keys(dataObj).map((currKey) => {
        let item = dataObj[currKey];
        let currVal = item["current_value"];
        let dataType = item["data_type"];
        let defaultVal = item["default_value"];
        let nameVal = item["name"];

        let objNewItem = {
            "current_value": currVal,
            "data_type": dataType,
            "default_value": defaultVal,
            "name": nameVal           
        }
        objTemp[nameVal] = objNewItem;
    });

    setPlayerGameDataTracker(objTemp);

}