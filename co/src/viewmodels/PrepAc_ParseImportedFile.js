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