import React from 'react';
import {  
    emptyConvNodeSinglePieceTemplate,
    gameUIDefaultButtonTemplate,
    gameUITextFrameTemplate,
    gameUIBackButtonTemplate,
    uiConvNavTemplate,
    logPageUISettingsTemplate
} from '../components/_dataStructure_DefaultObjects';







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

        }

        
        return (contentOk && uiOk);
    }


    function checkProjectFileContact(obj) {
        if (obj["meta_data"] === undefined || obj["chapter_content"] === undefined) {
            return false;
        } else {
            let contentMap = obj["chapter_content"];
            Object.keys(contentMap).map((chapterKey) => {
                //each chapter
                let chapterItem = contentMap[chapterKey];
                Object.keys(chapterItem).map((nodeKey) => {
                    //each node

                    let nodeItem = chapterItem[nodeKey];
                    
                    let nodeContent = nodeItem["nodeContent"];
                    let nodeUISettings = nodeItem["nodeUISettings"];
                    let nodeType = nodeItem["nodeType"];
                    //TODO add for node-type

                    let isNodeOk = checkNodeByType(nodeType, nodeContent, nodeUISettings);
               

                });

            });

            

            //TODO check meta_data
            // "game_data"
            // "resource_visual"
                    //check all item's format
            // "resource_audio"
            // "project_ui_language"
            // "navigation_settings"
                    //TODO check all keys from nav-settings obj
            // "chapter_list"
                //each chapter-each node: 
                    // col, display, nextNode, nodeName, nodeType, row, screenSize, 
            // "chapter_node_mapping"


        }



    }


    export function parseFromFile_vm(fileContent, setupContent) {
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

            } else {
                setupContent(jsonObj);
            }



        };


        reader.onerror = () => {
            console.log("Error reading the file. Please try again.", "error");
        };


        reader.readAsText(fileContent);

        return "";

    }

    function downloadObjectAsFile(obj, filename) {
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

    export async function downloadProjectAllInOne_vm(
        meta_obj, 
        chapterNodeMapAll, 
        getCurrChpNodeDataFromCloud, 
        filenamePrefix
    ) {


        downloadEntireProjectAll_vm(
            chapterNodeMapAll, 
            getCurrChpNodeDataFromCloud, 
            filenamePrefix,
            meta_obj
        );
        
    }
   

    export async function downloadEntireProjectAll_vm(
        chapterNodeMapAll, 
        getCurrChpNodeDataFromCloud, 
        filenamePrefix,
        meta_obj
    ) {
        
            let promiseArr = [];

            Object.keys(chapterNodeMapAll).map((chapKey) => {
                let chapterKeyHandled = chapKey.trim();

                if (chapterKeyHandled !== "chapter0" && chapterKeyHandled != "placeholder") {

                    const currPromise = new Promise(async(resolve, reject) => {
                        let fetchedChapterContent = await getCurrChpNodeDataFromCloud(chapKey);
                  
                        let outputObj = {};                 
                        outputObj[chapKey] = fetchedChapterContent;

                        resolve(outputObj);

                    });

                    promiseArr.push(currPromise);

                }                            

            });

            

            Promise.all(promiseArr).then((values)=>{

                let contentMap = {};

                values.forEach((innerMap)=>{
                    Object.keys(innerMap).map((currKey) => {
                        contentMap[currKey] = innerMap[currKey];
                    })
                })
                

                let fileNameEntire = filenamePrefix + "_all";
      
                let largeObj = {
                    "meta_data": meta_obj,
                    "chapter_content": contentMap
                }

                                //            console.log("\t\tlarge-obj = ", largeObj);

                
                downloadObjectAsFile(largeObj, fileNameEntire);
            })
    }
