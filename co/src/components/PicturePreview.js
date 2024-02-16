export default function PicturePreview ({urlList, selectedUrl}) {
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