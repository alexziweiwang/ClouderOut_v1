

function changeGameDataTracker(ds, itemName, value) {
    let gmdtObj = ds;
    gmdtObj[itemName].current_value = value;
    
    return gmdtObj;
}  


function changeGameDataTrackerByStatement(ds, itemName, action, newVal, type) { //TODO later
        //TODO check if valid
        if (ds[itemName] === undefined) {
            return;
        }
        //TODO check if valid

        let res = {};
        
        if (type === "boolean" || type === "string") {
            // type - boolean 
                // action is "becomes"
            let boolVal = (newVal === "true" || newVal === true) ? true : false;
            res = changeGameDataTracker(ds, itemName, boolVal);
        } else if (type === "string") {
            // type - string
                // action is "becomes"
                res = changeGameDataTracker(ds, itemName, newVal);
        } else if (type === "number") {
            // type - number
            let currVal = ds[itemName]["current_value"];

            let result = 0;
            let newValNum = newVal * 1;

            if (action === "becomes") {
                res = changeGameDataTracker(ds, itemName, newValNum);
            } else {
                // plus or minus
                    //TODO99999 
                                        console.log("ds = ", ds);
                                        console.log("currVal = ", currVal, ", type is ", typeof currVal, "\n newVal = ", newVal, " type is ", typeof newVal);




                if (action === "plus") {
                    result = currVal - (-1 * newValNum); //important, not directly adding
                    res = changeGameDataTracker(ds, itemName, result);
                } else if (action === "minus") {   
                    result = currVal - newValNum;
                    res = changeGameDataTracker(ds, itemName, result);
                }


            }
        }

        return res;
    }


export function buttonConsequenceByStatementEntireArray(pieceNum, buttonInfo, allPieceContent, gameDataTracker, setGameDataTracker, refreshCompo) {
//called by level-3
            console.log("$button pressed: ", buttonInfo);

    let stndButtonThisButtonInfo = allPieceContent[pieceNum]["stnd_btn_arr"].filter(e=>e["buttonText"] === buttonInfo["buttonText"]);
    
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

    } else {
        Object.keys(conseqMap).map((currKey) => {

            let itemName = conseqMap[currKey]["name"];  
            let action = conseqMap[currKey]["action"];  
            let newVal = conseqMap[currKey]["newVal"];  
            let type = conseqMap[currKey]["type"];  
                                                            console.log("calling change-by-stmt, ", conseqMap[currKey], "\n curr-gdt = ", gameDataTracker);
                                
            res = changeGameDataTrackerByStatement(res, itemName, action, newVal, type);

        });
        if (res === undefined) {
            res = {};
        }
                                console.log("\nchange-by-stmt-arr: after - ", res);

        setGameDataTracker(res);

        refreshCompo();

        
    }

    return res;


   
    
}
