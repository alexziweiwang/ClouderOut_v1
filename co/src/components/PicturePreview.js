export default function PicturePreview ({urlList, selectedUrl, removeFileFromAll}) {
    return (
        <div className="rsrcPrevArea" style={{"overflow": "scroll"}}>
            {urlList.map((item, index) => {
                return(
                <div key={index} style={{display: item["fileurl"] === selectedUrl ? 'inline' : 'none',}}>
                    <label>{item["filename"]}</label>
                    <button onClick={()=>{
                        removeFileFromAll();
                    }}> Delete (from all projects)
                    </button>


                    <br></br><br></br>
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