export default function PicturePreview ({urlList, selectedUrl, varPairData, updateVarPairData}) {
    //TODO use varPairData to display add or edit of variable-pair for this resource in this project
    //TODO call updateVarPairData when var-pair editted by user

    return (
        <div className="rsrcPrevArea paddings">
            {urlList.map((item, index) => {
                return(
                <div key={index} style={{display: item["fileurl"] === selectedUrl ? 'inline' : 'none',}}>
                    <label>{item["filename"]}</label><br></br><br></br>
                    <img 
                        className="picResource" 
                        src={item["fileurl"]} 
                        alt="preview_visual"
                    />
                </div>);
            }
            )}

        </div>
    );
}