import React from 'react';



export function parseFromFile_vm(fileContent) {
    let obj = {};

    let readContent = "default-empty";


    const reader = new FileReader();
    
    reader.onload = () => {
        readContent = reader.result;
    };


    reader.onerror = () => {
        console.log("Error reading the file. Please try again.", "error");
    };


    reader.readAsText(fileContent);


                        console.log("readContent = ", readContent);



    return "";

}


export function downloadEntireProjectFilePart1Meta_vm(
    {
        gameDataDesignList,
        visualMap,
        audioMap,
        languageCodeTextOption,
        currentProjectNav,
        chapterList,
        chapterNodeMapAll,
        filename
    }
) {


    let projectObjPart1Meta = {
        "game_data": gameDataDesignList,
        "resource_visual": visualMap,
        "resource_audio": audioMap,
        "project_ui_language": languageCodeTextOption,
        "navigation_settings": currentProjectNav,
        "chapter_list": chapterList,
        "chapter_node_mapping": chapterNodeMapAll,
    };

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
