import { useState } from "react";


export default function ItemVarPairManage ({varPairInfo, selectedUrl, updateVarPairDataFunction, fileType, saveToCloudFunc}) {
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
            
            <input value={inputContent} onChange={(event)=>{setInputContent(event.target.value);}}></input> 
            {isInVarPair == false && <button onClick={()=>{setInputContent(""); updateVarPairDataFunction("add", selectedUrl, inputContent, fileType);}}>Add</button>}
            {isInVarPair == true && <button onClick={()=>{ setInputContent(""); updateVarPairDataFunction("edit", selectedUrl, inputContent, fileType);}}>Edit</button>}
            <button className="buttonRight" onClick={()=>{}}> Save Changes to Cloud </button>

        </div>
    );
}