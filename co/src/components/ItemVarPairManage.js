import { useState } from "react";


export default function ItemVarPairManage ({varPairInfo, selectedUrl, updateVarPairDataFunction, fileType}) {
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
            {isInVarPair == false && <button onClick={()=>{updateVarPairDataFunction("add", selectedUrl, inputContent, fileType);}}>Add</button>}
            {isInVarPair == true && <button onClick={()=>{updateVarPairDataFunction("edit", selectedUrl, inputContent, fileType);}}>Edit</button>}
            
        </div>
    );
}