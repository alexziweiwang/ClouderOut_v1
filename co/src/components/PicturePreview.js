export default function PicturePreview ({urlList, selectedUrl, varPairData, updateVarPairData}) {
    //TODO use varPairData to display add or edit of variable-pair for this resource in this project
    //TODO call updateVarPairData when var-pair editted by user

    return (
        <div className="paddings">
            {urlList.map((item, index) => {
                return(
                <div key={index}>
                    <label>{item["filename"]}</label><br></br><br></br>
                    <img 
                        className="picResource" 
                        src={item["fileurl"]} 
                        alt="preview_visual" 
                        style={{display: item["fileurl"] === selectedUrl ? 'inline' : 'none',}}
                    />
                </div>);
            }
            )}

            <br></br>
            <div className="resourceVarPairWindow">Variable Pair management - Visual
                <br></br>TODO: from varPairData, check if this url is in var-pair record
                {<> <br></br>
                    <label>Variable Name: </label>
                    <input></input> 
                    {<button>Add</button>}
                    {<button>Edit</button>}
                </>}
            </div>   
        </div>
    );
}