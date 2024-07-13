import { useState, useEffect } from 'react';


export default function ConvTextContent_quickGameView({allPieceContent, initialPieceNum, displaySpeed, getCurrentPieceNum}) {
  
    const [currentPieceNum, setCurrentPieceNum] = useState(0);

    const [displayedContent, setDisplayedContent] = useState("");
    const [displayLength, setDisplayLength] = useState(0);
    const [continueRefreshing, setContinueRefreshing] = useState(true);

    const [fullContent, setFullContent] = useState(allPieceContent[initialPieceNum]);


    useEffect(() => {
        let displayedContentTemp = displayedContent;

        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);
          setContinueRefreshing(true);

          setDisplayedContent("");
          setDisplayLength(0);
          displayedContentTemp = "";
        }


        let wordContent = allPieceContent[currPieceNumTemp]["content"];

        if (wordContent !== fullContent) {
            setFullContent(wordContent);
            setContinueRefreshing(true);
            setDisplayedContent("");
            setDisplayLength(0);
            displayedContentTemp = "";
        }

        //TODO testing
        // console.log("expected wordContent? ", wordContent);
        // console.log("displayedContentTemp? [", displayedContentTemp , "]");
        // console.log("continue refreshing?", continueRefreshing === true);
        // console.log();


        if (continueRefreshing === true || wordContent !== fullContent) {
            
                if (displayedContentTemp.length < wordContent.length) {
                
                    const timeout = setTimeout(
                        () => {
                            setDisplayedContent(wordContent.substring(0, displayLength));
                            setDisplayLength(displayLength+1);
                        }, 
                        displaySpeed);
                    return () => clearTimeout(timeout);

                } else {     
                    setContinueRefreshing(false);
                }

            }
    });


    return(<div>
        {displayedContent}
    </div>)
}