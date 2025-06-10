import { useState, useEffect } from 'react';

//level6

export default function ConvTextContent_preview({
    initialAllPieceData, initialPieceNum, 
    getCurrentPieceNum, getAllPieceContent, 
    getDisplaySpeed, displaySpeed}) {
  
    const [currentPieceNum, setCurrentPieceNum] = useState(0);
    const [allPieceData, setAllPieceData] = useState(initialAllPieceData);

    const [displayedContent, setDisplayedContent] = useState("");
    const [displayLength, setDisplayLength] = useState(0);
    const [continueRefreshing, setContinueRefreshing] = useState(true);

    const [fullContent, setFullContent] = useState(initialAllPieceData[initialPieceNum]);

    const [currentSpeed, setCurrentSpeed] = useState(displaySpeed);

    useEffect(() => {
        let displayedContentTemp = displayedContent;
        let allPieceContentTemp = getAllPieceContent();
        if (allPieceContentTemp !== allPieceData) {
          setAllPieceData(allPieceContentTemp);

          setDisplayedContent("");
          setDisplayLength(0);
          displayedContentTemp = "";
        }
        
        let currPieceNumTemp = getCurrentPieceNum();
        if (currPieceNumTemp !== currentPieceNum) { //only update when different pieceNum chosen
          setCurrentPieceNum(currPieceNumTemp);
          setContinueRefreshing(true);

          setDisplayedContent("");
          setDisplayLength(0);
          displayedContentTemp = "";
        }

        let speedTemp = getDisplaySpeed();
        if (speedTemp !== currentSpeed) {
            setCurrentSpeed(speedTemp);
         
            setDisplayedContent("");
            setDisplayLength(0);
            displayedContentTemp = "";
            setContinueRefreshing(true);
        }


        //in this round, use allPieceContentTemp and currPieceNumTemp

        let wordContent = allPieceContentTemp[currPieceNumTemp]["content"];

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
                        speedTemp);
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