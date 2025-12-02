import React from 'react';
import {  
    emptyConvNodeSinglePieceTemplate,
    gameUIDefaultButtonTemplate,
    gameUITextFrameTemplate,
    gameUIBackButtonTemplate,
    uiConvNavTemplate,
    logPageUISettingsTemplate,
    projectNavUiTemplate,
    gdt1Template,
    epp2Template,
    epa3Template,
    metadataTemplate,



} from '../components/_dataStructure_DefaultObjects';

import { fetchProjectAllMetadataVM } from '../viewmodels/ProjectMetadataViewModel';
import { fetchAllNodes2VM } from '../viewmodels/NodeDataInPlayViewModel';
import { generateProjectOutputName_vm } from './PrepAc_Conversion';




    function checkNodeByType(typeStr, nodeContent, nodeUISettings) {
        let contentOk = false;
        let uiOk = false;

            //TODO check node-content (based on node-type)
            //TODO check nodeUI Settings (based on node-type)
        if (typeStr === "Conversation") {
            //nodeContent is an array of pieces (for conversatoin-node)

            nodeContent.map((item, index)=>{
                Object.keys(emptyConvNodeSinglePieceTemplate).map((currKey) => {
                    if (item[currKey] === undefined) {
                        contentOk = false;
                    }
                })
            })

                                                                            
            //nodeUISettings: emptyConvNodeUiAllTemplate
                    // defaultButton: gameUIDefaultButtonTemplate,
                    // textFrame: gameUITextFrameTemplate,
                    // backButton: gameUIBackButtonTemplate,
                    // convNav: uiConvNavTemplate,
                    // logPage: logPageUISettingsTemplate
            if (nodeUISettings["defaultButton"] === undefined
                || nodeUISettings["textFrame"] === undefined
                || nodeUISettings["backButton"] === undefined
                || nodeUISettings["convNav"] === undefined
                || nodeUISettings["logPage"] === undefined

            ) {
                uiOk = false;
            } else {
                Object.keys(gameUIDefaultButtonTemplate).map((currKey) => {
                    if (nodeUISettings["defaultButton"][currKey] === undefined) {
                        uiOk = false;
                    }
                })

                Object.keys(gameUITextFrameTemplate).map((currKey) => {
                    if (nodeUISettings["textFrame"][currKey] === undefined) {
                        uiOk = false;
                    }
                })

                Object.keys(gameUIBackButtonTemplate).map((currKey) => {
                    if (nodeUISettings["backButton"][currKey] === undefined) {
                        uiOk = false;
                    }
                })

                Object.keys(uiConvNavTemplate).map((currKey) => {
                    if (nodeUISettings["convNav"][currKey] === undefined) {
                        uiOk = false;
                    }
                })

                Object.keys(logPageUISettingsTemplate).map((currKey) => {
                    if (nodeUISettings["logPage"][currKey] === undefined) {
                        uiOk = false;
                    }
                })

            }

        } else {

            //TODO other node-types...

        }

        
        return (contentOk && uiOk);
    }

    function checkProjectContentData_vm(contentMap) {
        let res = true;
        Object.keys(contentMap).map((chapterKey) => {
            //each chapter
            let chapterItem = contentMap[chapterKey];
            Object.keys(chapterItem).map((nodeKey) => {
                //each node

                let nodeItem = chapterItem[nodeKey];
                
                let nodeContent = nodeItem["nodeContent"];
                let nodeUISettings = nodeItem["nodeUISettings"];
                let nodeType = nodeItem["nodeType"];

                let isNodeOk = checkNodeByType(nodeType, nodeContent, nodeUISettings);
                if (isNodeOk === false) {
                    return false;
                }

            });

        });
        return res;
    }

    //TODO9001
    export function checkProjectMetaData_vm(metadataObj) {
        if (metadataObj === undefined || metadataObj === -1) {
                                        console.log("invalid metadata-obj: ", metadataObj);
            return false;
        }

        let importantFields = [
            "game_data",
            "proj_resource_visual",
            "proj_resource_audio",
            "ui_language",
            "nav_ui_settings",
            "chapterList",
            "chapterNodeMapping",
            "convNodeUiPlanMap",
            "sizeDirection",
            "emu4sets",
            "slInfo",
        ];

        importantFields.map((item, index)=>{
            if (metadataObj[item] === undefined) {
                console.log("@@@field incomplete...", item, " \n", metadataObj);
                return false;    
            }
        })


                            //     if (metadataObj["game_data"] === undefined 
                            //     || metadataObj["proj_resource_visual"] === undefined 
                            //     || metadataObj["proj_resource_audio"] === undefined 
                            //     || metadataObj["ui_language"] === undefined 
                            //     || metadataObj["nav_ui_settings"] === undefined 
                            //     || metadataObj["chapterList"] === undefined 
                            //     || metadataObj["chapterNodeMapping"] === undefined 
                            //     || metadataObj["convNodeUiPlanMap"] === undefined
                            //     || metadataObj["sizeDirection"] === undefined
                            //     || metadataObj["emu4sets"] === undefined
                            //     || metadataObj["slInfo"] === undefined
                            // ) {

                            //                                         console.log("@@@field incomplete...", metadataObj);
                            //     return false;                                           
                            // } 



        let gameDataMap = metadataObj["game_data"];
        // "game_data"
                    //"data_type"
                    //"default_value"
                    //"name"

        Object.keys(gameDataMap).map((currKey) => {         
            let item = gameDataMap[currKey];  

            if (item["data_type"] === undefined
            || item["default_value"] === undefined
            || item["name"] === undefined
            ) {
                                            console.log("@@@incomplete game-data-design-list");
                return false;
            }
        });


        let projNavSettingObj = metadataObj["nav_ui_settings"];
        // "nav_ui_settings"
                    //projectNavUiTemplate
        Object.keys(projectNavUiTemplate).map((currKey) => {
            if (projNavSettingObj[currKey] === undefined) {
                                            console.log("@@@invalid nav-ui-settings");
                return false;
            }

        })

        // "chapterList"
            //each item: length should be 4
        let chapList = metadataObj["chapterList"];
        Object.keys(chapList).map((currKey) => {
            let item = chapList[currKey];
            if (item.length !== 4) {
                                            console.log("@@@invalid chapter-list");
                return false;
            }
        });

    

            // "proj_resource_visual"
        //check all item's format
        //each item: "url" "var"
        let visResObj = metadataObj["proj_resource_visual"];
        Object.keys(visResObj).map((currKey) => {
            let item = visResObj[currKey];
            if (item["url"] === undefined || item["var"] === undefined) {
                                            console.log("@@@invalid visual resource var pairs");
                return false;
            }

        });


        // "proj_resource_audio"
        let auResObj = metadataObj["proj_resource_audio"];
        Object.keys(auResObj).map((currKey) => {
            let item = auResObj[currKey];
            if (item["url"] === undefined || item["var"] === undefined) {
                                            console.log("@@@invalid visual resource var pairs");

                return false;
            }
        });




    // "chapterNodeMapping"
        //each chapter-each node: 
                        // col, display, nextNode, nodeName, nodeType, row, screenSize, 
        let nodeMappingLargeMap = metadataObj["chapterNodeMapping"];
        Object.keys(nodeMappingLargeMap).map((chapKey) => {
            let currChapterSmallMap = nodeMappingLargeMap[chapKey];

                                          //  console.log("chap = ", chapKey);

            Object.keys(currChapterSmallMap).map((nodeKey)=>{
                if (nodeKey !== "placeholder") {
                                          //  console.log("\tnode-key = ", nodeKey, "\n chapter-map = ", currChapterSmallMap, "\n item = ", currChapterSmallMap[nodeKey]);
                    let item = currChapterSmallMap[nodeKey];

                    let nodeMappingFields = [
                        "row",
                        "col",
                        "display",
                        "nodeName",
                        "nodeType",
                        "screenSize"
                    ];

                    nodeMappingFields.map((fieldItem, fieldIndex)=>{
                        if (item[fieldItem] === undefined) {
                            return false;    
                        }
                    })
                            
                                            // if (item === undefined
                                            // || item["col"] === undefined
                                            // || item["display"] === undefined
                                            // || item["nodeName"] === undefined
                                            // || item["nodeType"] === undefined
                                            // || item["row"] === undefined
                                            // || item["screenSize"] === undefined
                                            //     ) {
                                            //                                 console.log("@@@invalid node mapping: ", nodeKey, "\n\t item = ", item);
                                
                                            //         return false;
                                            // } 
                }

            })
      

 


        });



        //TODO99999 emu-4-sets
        //"emu4sets"
        let emu4sets = metadataObj["emu4sets"];
        if (emu4sets === undefined
        || emu4sets["gdt1"] === undefined
        || emu4sets["epp2"] === undefined
        || emu4sets["epa3"] === undefined) {

                            console.log("@@@invalid emu4sets: ", metadataObj["emu4sets"]);

            return false;
        }
        
        let gdt1Obj = emu4sets["gdt1"];
        let epp2Obj = emu4sets["epp2"];
        let epa3Obj = emu4sets["epa3"];
                                console.log("check-metadata -- emu: gdt1 = ", gdt1Obj);
        Object.keys(gdt1Obj).map((itemKey) => {
            let item = gdt1Obj[itemKey];

            Object.keys(gdt1Template).map((currKey) => {
                if (item[currKey] === undefined) {
                                            console.log("@@@invalid emu4sets: gdt1 - ", currKey);
                    return false;
                }
            });
        });   
        // gdt1Template


        Object.keys(epp2Template).map((currKey) => {
            if (epp2Obj[currKey] === undefined) {
                                        console.log("@@@invalid emu4sets: epp2 - ", currKey);
                return false;
            }
        });
        // epp2Template


        Object.keys(epa3Template).map((currKey) => {
            if (epa3Obj[currKey] === undefined) {
                                        console.log("@@@invalid emu4sets: epa3 - ", currKey);
                return false;
            }
        });
        // epa3Template


        //slInfo //TODO9001
            //option: slSlots / chapterExpr
            //sl slot settings: 
                    //page-shape: row, col, page
                    //sl-page-ui (setup in nav-setter, preview in nav-preview):
                        // item-w, item-h, text-position, title-text, timestamp, etc.

        let slObj = metadataObj["slInfo"];
        let slPageInfo = slObj;

        let slPageInfoFields = [
            "row",
            "col",
            "pageCount",
            "item_w",
            "item_h",
            "itemTitleStamp",
            "bgPicName",
            "groupPosX",
            "groupPoxY",
            "groupItemGapX",
            "groupItemGapY"
        ];

        if (slObj["format"] === "slSlots") {
            if (slPageInfo === undefined) {
                return false;
            }

            slPageInfoFields.map((item, index)=>{
                if (slPageInfo[item] === undefined) {
                    return false;    
                }
            })
                                                        // if (slPageInfo["row"] === undefined
                                                        //     || slPageInfo["col"] === undefined    
                                                        //     || slPageInfo["page"] === undefined  
                                                        //     || slPageInfo["item_w"] === undefined              
                                                        //     || slPageInfo["item_h"] === undefined              
                                                        //     || slPageInfo["itemTitleStamp"] === undefined  
                                                        //     || slPageInfo["bgPicName"] === undefined  
                                                        //     || slPageInfo["groupPosX"] === undefined  
                                                        //     || slPageInfo["groupPoxY"] === undefined  
                                                        //     || slPageInfo["groupItemGapX"] === undefined  
                                                        //     || slPageInfo["groupItemGapY"] === undefined  
                                                        // ) {
                                                        //     return false;
                                                        // }

        }


    

        return true;
    }


    function checkProjectFileContact(obj) {
        let contentMapOk = false;
        let metadataObjOk = false;

        if (obj["meta_data"] === undefined || obj["chapter_content"] === undefined) {
            return false;
        } else {
            let contentMap = obj["chapter_content"];
            contentMapOk = checkProjectContentData_vm(contentMap);
            
            let metadataObj = obj["meta_data"];
            metadataObjOk = checkProjectMetaData_vm(metadataObj);

        }

                                                                        if (contentMapOk && metadataObjOk) {
                                                                            console.log("so far ok");

                                                                        }

        return contentMapOk && metadataObjOk;

    }


    export function parseFromFile_vm(fileContent, setupContent, setParseFeedback) {
        
                                console.log("parseFromFile-vm: [", fileContent, "]...");

        let readContent = "default-empty";


        const reader = new FileReader();
        
        reader.onload = () => {
            readContent = reader.result;

            let jsonObj;

            jsonObj = JSON.parse(readContent);

                                        console.log("\t\tcontent obj = ", jsonObj);

            let checkResult = checkProjectFileContact(jsonObj);
            if (checkResult === false) {
                let errObj = {"error######################": "error######################"};
                setupContent(errObj);

                setParseFeedback("Project File Format Incorrect.");
            } else {
                setupContent(jsonObj);
                setParseFeedback("Project File accepted.");
            }



        };


        reader.onerror = () => {
            console.log("Error reading the file. Please try again.", "error");
        };


        reader.readAsText(fileContent);

        return "";

    }

    export function downloadProjectEntireFromCloudVM(projectKeyName, authorName, backendOption) {
//TODO123

        await fetchProjectAllMetadataVM({
                projectName: projectKeyName, 
                currUser: authorName,
                bkOption: backendOption
            }).then((metadataTemp)=>{

            if (metadataTemp !== undefined) {
                let res = checkProjectMetaData_vm(metadataTemp);
                if (res === true) {
                    let entireObj = {
                        "meta_data": metadataTemp,
                        "chapter_content": {}
                    }

                    //TODO continue to all-node-data
                    await fetchAllNodes2VM({
                        projectName: projectKeyName, 
                        uname: authorName,
                        bkOption: backendOption
                    }).then((allNodeDataTemp)=>{
                        
                        entireObj["chapter_content"] = allNodeDataTemp;
                        
                        let filename = generateProjectOutputName_vm(projectKeyName, authorName);

                        downloadObjectAsFile(entireObj, filename);

                    }); 

                } else {
                    alert("Data for this project file is broken.");
                }
            }

        })

    }

    export function downloadObjectAsFile(obj, filename) {
        let fileContentTemp = JSON.stringify(obj);
                         
        let textFileAsBlob = new Blob([fileContentTemp], { type: 'text/plain' });
        
        let downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.innerHTML = 'Download File';
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(
                textFileAsBlob
            );
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();

    }
