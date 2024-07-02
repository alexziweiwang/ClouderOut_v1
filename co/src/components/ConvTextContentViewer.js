import { useState, useEffect } from 'react';


export default function ConvTextContentViewer({wordContent, updateWordContent}) {

    const [displayedContent, setDisplayedContent] = useState("");
    const [displayLength, setDisplayLength] = useState(0);
    const [continueRefreshing, setContinueRefreshing] = useState(true);

    const [fullContent, setFullContent] = useState(wordContent);

    useEffect(() => {
        let tempFullContent = updateWordContent();
        if (tempFullContent !== fullContent) {
            setFullContent(tempFullContent);
            setContinueRefreshing(true);
        }
 
        console.log("displaycontent?", displayedContent);
        console.log("continue refreshing?", continueRefreshing=== true);

        if (continueRefreshing === true) {
            
            if (displayedContent.length < wordContent.length) {
                setDisplayedContent(wordContent.substring(0, displayLength));
                setDisplayLength(displayLength+1);
                let i = 0;
                for(; i < 1000; i++) {
                    console.log("...");
                }
            } else {
                setContinueRefreshing(false);
            }
        }
    });


    return(<div>
        {displayedContent}
    </div>)
}