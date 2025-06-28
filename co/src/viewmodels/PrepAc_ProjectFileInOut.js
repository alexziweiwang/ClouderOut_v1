import React from 'react';

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
                    //TODO add for node-type


                    //TODO check node-content (based on node-type)
                    //TODO check nodeUI Settings (based on node-type)


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
