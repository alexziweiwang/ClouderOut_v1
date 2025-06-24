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

    export function downloadProjectAllInOne_vm() {
        
    }


    export function downloadEntireProjectFilePart1Meta_vm(projectObjPart1Meta, filename) {

            let fileContentTemp = JSON.stringify(projectObjPart1Meta);

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


    async function exportEachChapterNodesData(chapterKey, getCurrChpNodeDataFromCloud, filenamePrefix) {
            let chapAllNodes = await getCurrChpNodeDataFromCloud(chapterKey);
            let fileContentTemp = JSON.stringify(chapAllNodes);

            let textFileAsBlob = new Blob([fileContentTemp], { type: 'text/plain' });

            let downloadLink = document.createElement('a');
            downloadLink.download = downloadLink.download = filenamePrefix + chapterKey;


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

    export async function fetchEntireProjectAllNodesDataFromCloud_vm(chapterNodeMapAll, filenamePrefix, getCurrChpNodeDataFromCloud) {
            Object.keys(chapterNodeMapAll).map(async (chapKey) => {
            let chapterKeyHandled = chapKey.trim();

                if (chapterKeyHandled !== "chapter0" && chapterKeyHandled != "placeholder") {
                
                    //TODO999 for each chapter ... get all of its node's data?
                    await exportEachChapterNodesData(chapKey, getCurrChpNodeDataFromCloud, filenamePrefix);
                        
                }
            });
    
    }
