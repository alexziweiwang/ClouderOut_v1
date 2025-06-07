






export function changeGameDataTrackerByStatement(ds, name, action, newVal, type, changeGameDataTracker) { //TODO later
        //TODO check if valid
        if (ds[name] === undefined) {
            return;
        }
        //TODO check if valid

        let res = {};
        
        if (type === "boolean" || type === "string") {
            // type - boolean 
                // action is "becomes"
            let boolVal = (newVal === "true" || newVal === true) ? true : false;
            res = changeGameDataTracker(ds, name, boolVal);
        } else if (type === "string") {
            // type - string
                // action is "becomes"
                res = changeGameDataTracker(ds, name, newVal);
        } else if (type === "number") {
            // type - number
            let currVal = ds[name]["current_value"];

            let result = 0;
            if (action === "plus") {
                result = currVal - (-1 * newVal); //important, not directly adding
                res = changeGameDataTracker(ds, name, result);
            } else if (action === "minus") {   
                result = currVal - newVal;
                res = changeGameDataTracker(ds, name, result);
            } else if (action === "becomes") {
                res = changeGameDataTracker(ds, name, newVal);
            }
        }

        return res;
    }


export function buttonConsequenceByStatementEntireArray(pieceNum, item, allPieceContent, gameDataTracker, changeGameDataTracker, setGameDataTracker, updateRenderCounter) {

    let stndButtonThisButtonInfo = allPieceContent[pieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === item["buttonText"]);
    
    let conseqMap = stndButtonThisButtonInfo[0]["conseq"]; 
    if (conseqMap === undefined) {
                                                        console.log("2... conseqMap undefined.");
        return;
    }
                                                      //  console.log("2conseqMap: ", conseqMap, ", len = ", len);
    let res = gameDataTracker;
                                                //        console.log("\nchange-by-stmt-arr: before - ", res);
    Object.keys(conseqMap).map((currKey) => {

        let name = conseqMap[currKey]["name"];  
        let action = conseqMap[currKey]["action"];  
        let newVal = conseqMap[currKey]["newVal"];  
        let type = conseqMap[currKey]["type"];  
                                                        console.log("2calling change-by-stmt, ", conseqMap[currKey]);
                              
        res = changeGameDataTrackerByStatement(res, name, action, newVal, type, changeGameDataTracker);

    });

                                                        console.log("\nchange-by-stmt-arr: after - ", res);

    setGameDataTracker(res);
    updateRenderCounter();
    
}
