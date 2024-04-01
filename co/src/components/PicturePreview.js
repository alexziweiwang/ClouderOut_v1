import { removeFromRmFileListVM } from '../viewmodels/ResourceManagerViewModel';

export default function PicturePreview ({urlList, selectedUrl, username, filename}) {
    return (
        <div className="rsrcPrevArea">
            {urlList.map((item, index) => {
                return(
                <div key={index} style={{display: item["fileurl"] === selectedUrl ? 'inline' : 'none',}}>
                    <label>{item["filename"]}</label><br></br><br></br>
                    <img 
                        className="picResource" 
                        src={item["fileurl"]} 
                        alt="preview_visual"
                    />


                <br></br>   
                <button className="buttonRight" onClick={()=>{
                    removeFromRmFileListVM({uname: username, filetitle: filename});
                }}> Delete (from all projects)</button>


                </div>);
            }
            )}

        </div>
    );
}