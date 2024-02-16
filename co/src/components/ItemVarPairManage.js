import { useState } from "react";


export default function ItemVarPairManage ({varPairInfo, selectedUrl, updateVarPairDataFunction}) {
    console.log("var-pair-manage: render once. "); //TODO testing
    console.log(" current url: ", selectedUrl);

    const displayPart = varPairInfo.filter(elem => elem["url"] === selectedUrl);
    const displayItem = displayPart[0];
    let isInVarPair = false;
    if (displayPart.length > 0) {
        isInVarPair = true;
    }

    const [inputContent, setInputContent] = useState("");

    return (
        <div className="resourceVarPairWindow">            
            <label>Variable Name: </label>
            {isInVarPair == true && <><label>{displayItem["var"]}</label><br></br></>}
            
            <input onChange={(event)=>{setInputContent(event.target.value);}}></input> 
            {isInVarPair == false && <button onClick={()=>{updateVarPairDataFunction("add", selectedUrl, inputContent);}}>Add</button>}
            {isInVarPair == true && <button onClick={()=>{updateVarPairDataFunction("edit", selectedUrl, inputContent);}}>Edit</button>}
            
        </div>
    );
}