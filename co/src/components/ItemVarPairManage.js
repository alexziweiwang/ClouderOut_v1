export default function ItemVarPairManage ({varPairInfo, selectedUrl, updateVarPairDataFunction}) {
    //TODO use varPairData to display add or edit of variable-pair for this resource in this project
    //TODO call updateVarPairData when var-pair editted by user

    let displayPart = varPairInfo.filter((e) => {e["fileurl"] === selectedUrl});
    let displayItem = displayPart[0];
    let isInVarPair = false;
    if (displayPart.length > 0) {
        isInVarPair = true;
    }

    return (
        <div className="resourceVarPairWindow">Variable Pair management - Audio
            <br></br>TODO: from varPairData, check if this url is in var-pair record
            {isInVarPair == true && <label>Data Content: {displayItem["fileurl"]}</label>}
            {<> <br></br>
            <label>Variable Name: </label>
            <input></input> 
            {isInVarPair == false && <button>Add</button>}
            {isInVarPair == true && <button>Edit</button>}
            </>}
        </div>
    );
}