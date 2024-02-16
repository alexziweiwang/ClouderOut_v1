import { useState } from "react";


export default function ItemVarPairManage ({varPairInfo, selectedUrl, updateVarPairDataFunction}) {

    const displayPart = varPairInfo.filter(elem => elem["fileurl"] === selectedUrl);
    const displayItem = displayPart[0];
    let isInVarPair = false;
    if (displayPart.length > 0) {
        isInVarPair = true;
    }

    const [inputContent, setInputContent] = useState("");

    return (
        <div className="resourceVarPairWindow">
            {isInVarPair == true && <label>Data Content: {displayItem["fileurl"]}</label>}
            
            <label>Variable Name: </label>
            <input onChange={(event)=>{setInputContent(event.target.value);}}></input> 
            {isInVarPair == false && <button onClick={()=>{updateVarPairDataFunction("add", selectedUrl, inputContent);}}>Add</button>}
            {isInVarPair == true && <button onClick={()=>{updateVarPairDataFunction("edit", selectedUrl, inputContent);}}>Edit</button>}
            
        </div>
    );
}