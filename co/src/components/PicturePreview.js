export default function PicturePreview ({urlList, selectedUrl}) {
    return (
        <div>
            {urlList.map((item, index) => {
                return(
                <div key={index}>
                    {item["fileurl"] === selectedUrl && 
                        <img 
                            className="picResource" 
                            src={item["fileurl"]} 
                            alt="preview_visual" 
                        />}
                </div>);
            }
            )}
        </div>
    );
}