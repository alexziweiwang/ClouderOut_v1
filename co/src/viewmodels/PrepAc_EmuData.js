import { dupObject, dupNestedObject } from './PrepAc_Conversion';


export function prepare1Gdt_vm(
    gdt1Item,
    setGdt1, 
    update1Gdt,

    gameDataDesign
    ) { //prepare emu-game-data
    let tempObj1 = {}; //TODO6000 gdt1-template here

    tempObj1 = gdt1Item;
        
    
                                                //console.log("emu-gdt1 from cloud: ", tempObj1, "......... getOfflineModeName = ", offlineModeName);

    let objSize = 0;

    if (tempObj1 !== undefined) {
        objSize = Object.keys(tempObj1).length;
    }



    let gDataDesignMap = gameDataDesign;
            
    let gdtListLen = 0;

    if (gDataDesignMap !== null && gDataDesignMap !== undefined) {
            gdtListLen = Object.keys(gDataDesignMap).length;

            if (objSize !== gdtListLen) { //emu-data-list not updated with game-data-design-list

                let trackerMap = {};
                {Object.keys(gDataDesignMap).map((currKey) => {
                        if (tempObj1[currKey] !== undefined) { //compare with emu-list, already here

                                trackerMap[currKey] = tempObj1[currKey];
                        } else {

                                let name = gDataDesignMap[currKey]["name"];
                                let defaultVal = gDataDesignMap[currKey]["default_value"];
                                let dataType = gDataDesignMap[currKey]["data_type"];

                            let obj = {
                                "name": name,
                                "default_value": defaultVal,
                                "data_type": dataType,
                                "current_value": defaultVal
                            }
                            trackerMap[currKey] = obj;
                        }

                })};

                tempObj1 = trackerMap;

            }
    }

                                               console.log("... gdt1_vm prep: ", tempObj1); //TODO test


    setGdt1(tempObj1);
    update1Gdt(tempObj1);
    
} 



export function prepare2Epp_vm(
    epp2Item,
    
    setEpp2, 
    update2Epp, 
    
) {
    
    let tempObj2 = epp2Item;
                                            console.log("... epp2 prep1: ", epp2Item); //TODO test


    let objSize = 0;
    if (tempObj2 !== undefined) {
        objSize = Object.keys(tempObj2).length;
    } else if (
        objSize === 0 
        || tempObj2 === undefined 
        || tempObj2 === null
    ) {
        // initialize

        tempObj2 = { 
            "playername": "playerA",
            "userTitle": "title1",
            "iconPicName": "",
            "level": 1,
            "membership": 1,
        };
    }
                                            console.log("... epp2 prep2: ", tempObj2); //TODO test

    setEpp2(tempObj2);
    update2Epp(tempObj2);

}  


export function prepare3Epa_vm(
    epa3Item, 

    setEpa3, 
    update3Epa, 
        
) {
    let tempObj3 = epa3Item;

    let objSize = 0;
    if (tempObj3 !== undefined) {
        objSize = Object.keys(tempObj3).length;
    } else if (objSize === 0 || tempObj3 === undefined || tempObj3 === null) {
        tempObj3 = {
            "playername": "default_player",
            "email": "example@email.com",
        }
    }

                                       console.log("... epa3 prep: ", tempObj3); //TODO test

    setEpa3(tempObj3);
    update3Epa(tempObj3);
}

export function makeDupGdt1_vm(data1) {
    if (data1 === undefined) {
        return {};
    }

    let largeMap = {};

    Object.keys(data1).map((currKey) => {
            let dataItemSource = data1[currKey];

            let dataItemDest = dupObject(dataItemSource);

            largeMap[currKey] = dataItemDest;
        }
    );
    

    return largeMap;
}

export function makeDupEpp2_vm(data2) {
    return dupObject(data2);

                                // let pn = data2["playername"];
                                // let ut = data2["userTitle"];
                                // let icpn = data2["iconPicName"];
                                // let lvl = data2["level"];
                                // let mbsp = data2["membership"];

                                // let tempObj = { 
                                //     "playername": pn,
                                //     "userTitle": ut,
                                //     "iconPicName": icpn,
                                //     "level": lvl,
                                //     "membership": mbsp,
                                // };

}

export function makeDupEpa3_vm(data3) {
    return dupObject(data3);
                                // let pn = data3["playername"];
                                // let eml = data3["email"];

                                // let tempObj = {
                                //     "playername": pn,
                                //     "email": eml,            
                                // }

}

export function makeDupEss4_vm(data4) {
    return dupObject(data4);

}



export function makeDupShp5_vm(data) {
    //TODO200 make-dup first, and send only the dup-ver.



    let shopStockItemSource = data["shopStock"];
    let playerPurcSttSource = data["playerPurchaseStatus"];

    let shopStockItemDest= dupObject(shopStockItemSource);
    let playerPurcDest = dupObject(playerPurcSttSource);

    let tempObj = {
        "shopStock": shopStockItemDest,
        "playerPurchaseStatus":  playerPurcDest
    };
    
//TODO900 fix later

                                    // data["shopStock"].map((item, index) => {
                                    //     tempObj["shopStock"]["productKey"] = item["productKey"];
                                    //     tempObj["shopStock"]["productName"] = item["productName"];
                                    //     tempObj["shopStock"]["productPrice"] = item["productPrice"];
                                    //     tempObj["shopStock"]["productInfo"] = item["productInfo"];
                                    //     tempObj["shopStock"]["hidden"] = item["hidden"];

                                    // });

                                    // data["playerPurchaseStatus"].map((item, index) => {
                                    //     tempObj["playerPurchaseStatus"]["productKey"] 
                                    //         = item["productKey"];

                                    //     tempObj["playerPurchaseStatus"]["acquired"] 
                                    //         = item["acquired"];

                                    //     tempObj["playerPurchaseStatus"]["acquiredTimeStamp"] 
                                    //         = item["acquiredTimeStamp"];
                                        
                                    // });




    return tempObj;
    

}
