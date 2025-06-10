import { fetchEmuData1GdtVM, fetchEmuData2EppVM, fetchEmuData3EpaVM, fetchEmuData4EssVM, fetchEmuData5ShpVM, updateAllSetsVM } from './EmuManagingViewModel';
import { getProjectGameDataDesignVM } from './GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from './ResourceManagerViewModel';


export async function prepare1Gdt_vm(providedUname, projName, backendOption, setGdt1, update1Gdt, offlineModeName) { //prepare emu-game-data
    let tempObj1 = {}; //TODO6000 gdt1-template here

    if (offlineModeName === "online_cloud") {

        tempObj1 = await fetchEmuData1GdtVM({
            projectName: projName, 
            currUser: providedUname,
            bkOption: backendOption
        });
        
    }
                                                //console.log("emu-gdt1 from cloud: ", tempObj1, "......... getOfflineModeName = ", offlineModeName);

    let objSize = 0;

    if (tempObj1 !== undefined) {
        objSize = Object.keys(tempObj1).length;
    }


    if (offlineModeName === "online_cloud") {

        let gDataDesignMap = await getProjectGameDataDesignVM(({ //TODO6000 fetch from game-maker instead (to save cloud op?)

                projectName: projName, 
                uname: providedUname, 
                mostUpdated: true,
                bkOption: backendOption
        }));
            
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

                        })} 

                        tempObj1 = trackerMap;

                }
            }

    }


                                               console.log("... gdt1_vm prep: ", tempObj1); //TODO test


    setGdt1(tempObj1);
    update1Gdt(tempObj1);
    
} 

