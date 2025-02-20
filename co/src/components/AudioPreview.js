export default function AudioPreview ({urlList, selectedUrl}) {
    

    return (
        <div className="rsrcPrevArea">
            {urlList.map((item, index) => {
                return(
                    <div key={index} style={{display: item["fileurl"] === selectedUrl ? 'inline' : 'none',}}>
                        <label>{item["filename"]}</label><br></br><br></br>
                        
                        
                        {selectedUrl.length > 0 &&
                            <audio 
                                src={item["fileurl"]} 
                                controls 
                            />
                        }
                    
                    </div>);
            }
            )}
        </div>
    );
}