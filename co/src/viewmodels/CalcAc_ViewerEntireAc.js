

export function configureGameProgress_vm (
    nodeTypeVal, 
    chapterKeyVal, 
    nodeKeyVal, 
    pageNameVal, 
    chapterTitleVal, 
    currentGameStatusProgress, 
    setCurrentGameStatusProgress
    
) {


    let nodeTypeTemp = nodeTypeVal;
    let chapterKeyTemp = chapterKeyVal;
    let nodeKeyTemp = nodeKeyVal;
    let pageNameTemp = pageNameVal;
    let chapterTitleTemp = chapterTitleVal;

    let progressObj = currentGameStatusProgress;

    if (nodeTypeTemp === progressObj["nodeType"]
        && chapterKeyTemp === progressObj["chapterKey"]
        && pageNameTemp === progressObj["pageStatus"]
        && nodeKeyTemp !== progressObj["nodeKey"]
    ) {
        return;
    } else {
        if (nodeTypeTemp !== progressObj["nodeType"]) {
            progressObj["nodeType"] = nodeTypeTemp;
        }
        if (chapterKeyTemp !== progressObj["chapterKey"]) {
            progressObj["chapterKey"] = chapterKeyTemp;
        }
        if (chapterTitleTemp !== progressObj["chapterTitle"]) {
            progressObj["chapterTitle"] = chapterTitleTemp;
        }
        if (pageNameTemp !== progressObj["pageStatus"]) {
            progressObj["pageStatus"] = pageNameTemp;
        }
        if (nodeKeyTemp !== progressObj["nodeKey"]) {
            progressObj["nodeKey"] = nodeKeyTemp;
        }

                                     //           console.log("resetting currentGameStatusProgress! progressObj = ", progressObj);
   
   
   
        setCurrentGameStatusProgress(progressObj);
    }

  

}

