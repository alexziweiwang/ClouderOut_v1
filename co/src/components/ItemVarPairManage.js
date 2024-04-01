import { useState } from "react";


export default function ItemVarPairManage ({varPairInfo, selectedUrl, storeNewVarPairDataFunction, fileType, saveToCloudFunc}) {
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
            {isInVarPair == true && <><label>{displayItem["var"]}</label>
                <button onClick={()=>{ setInputContent(""); storeNewVarPairDataFunction("delete", selectedUrl, inputContent, fileType);}}>Delete this Naming</button>
            <br></br>
            <label>Rename: </label></>}
            
            <input value={inputContent} onChange={(event)=>{setInputContent(event.target.value);}}></input> 
            {isInVarPair == false && <button onClick={()=>{setInputContent(""); storeNewVarPairDataFunction("add", selectedUrl, inputContent, fileType);}}>Add</button>}
            {isInVarPair == true && 
                <button onClick={()=>{ setInputContent(""); storeNewVarPairDataFunction("edit", selectedUrl, inputContent, fileType);}}>Update</button>}

            <button className="buttonRight" onClick={()=>{}}> Save Changes to Cloud </button>
        </div>
    );
}