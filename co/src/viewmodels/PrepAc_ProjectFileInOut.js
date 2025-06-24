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

    export async function downloadProjectAllInOne_vm(
        meta_obj, 
        chapterNodeMapAll, 
        getCurrChpNodeDataFromCloud, 
        filename
    ) {


        await fetchEntireProjectAllNodesDataFromCloud_vm(
            chapterNodeMapAll, 
            getCurrChpNodeDataFromCloud
        )
        .then((content_obj)=>{

                let largeObj = {
                    "meta-data": meta_obj,
                    "content-by-chapter": content_obj
                };
        
                let fileContentTemp = JSON.stringify(largeObj);
                                                    
                                                       console.log("!!! entire-obj = \n", largeObj, "\n");
        

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

        });

        
    
    }

    export async function fetchEntireProjectAllNodesDataFromCloud_vm(chapterNodeMapAll, getCurrChpNodeDataFromCloud) {
        let allMap = {};    
        
        Object.keys(chapterNodeMapAll).map(async (chapKey) => {
            let chapterKeyHandled = chapKey.trim();

            if (chapterKeyHandled !== "chapter0" && chapterKeyHandled != "placeholder") {
                
                    //TODO999 for each chapter ... get all of its node's data?
                   // await exportEachChapterNodesData(chapKey, getCurrChpNodeDataFromCloud, filenamePrefix);
                   
                   let chapNodeTemp = await getCurrChpNodeDataFromCloud(chapKey);
                   allMap[chapKey] = chapNodeTemp;
            }
        });



        return allMap;
    
    }
