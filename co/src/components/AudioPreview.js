export default function AudioPreview ({urlList, selectedUrl}) {
    
    return (
        <div className="rsrcPrevArea paddings">
            {urlList.map((item, index) => {
                return(
                    <div style={{display: item["fileurl"] === selectedUrl ? 'inline' : 'none',}}>
                        <label>{item["filename"]}</label><br></br><br></br>
                        <audio 
                            src={item["fileurl"]} 
                            controls />
                    
                    </div>);
            }
            )}
        </div>
    );
}