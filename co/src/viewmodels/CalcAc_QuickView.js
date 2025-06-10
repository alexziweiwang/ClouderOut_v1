

function changeGameDataTracker(ds, name, value) {
    let gmdtObj = ds;
    gmdtObj[name].current_value = value;
    
    return gmdtObj;
}  


function changeGameDataTrackerByStatement(ds, name, action, newVal, type) { //TODO later
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


export function buttonConsequenceByStatementEntireArray(pieceNum, item, allPieceContent, gameDataTracker, setGameDataTracker, refreshCompo) {
//called by level-3


    let stndButtonThisButtonInfo = allPieceContent[pieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === item["buttonText"]);
    
    let conseqMap = stndButtonThisButtonInfo[0]["conseq"]; 
    if (conseqMap === undefined) {
                                                        console.log("... conseqMap undefined.");
        return {};
    }
                                                      //  console.log("conseqMap: ", conseqMap, ", len = ", len);
    let res = gameDataTracker;
    if (gameDataTracker === undefined) {
        res = {};
        setGameDataTracker(res);
        refreshCompo();
        return;

    } else {
        Object.keys(conseqMap).map((currKey) => {

            let name = conseqMap[currKey]["name"];  
            let action = conseqMap[currKey]["action"];  
            let newVal = conseqMap[currKey]["newVal"];  
            let type = conseqMap[currKey]["type"];  
                                                            console.log("calling change-by-stmt, ", conseqMap[currKey]);
                                
            res = changeGameDataTrackerByStatement(res, name, action, newVal, type);

        });
        if (res === undefined) {
            res = {};
        }
                                console.log("\nchange-by-stmt-arr: after - ", res);

        setGameDataTracker(res);

        refreshCompo();
    }




   
    
}
