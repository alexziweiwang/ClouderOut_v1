import React from 'react';



    export function parseFromFile_vm(fileContent, setupContent) {
        let obj = {};

        let readContent = "default-empty";


        const reader = new FileReader();
        
        reader.onload = () => {
            readContent = reader.result;

            let jsonObj = JSON.parse(readContent);


            setupContent(jsonObj);

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
