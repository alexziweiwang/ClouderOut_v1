import { useState, useEffect } from 'react';


export default function ConvTextContent_quickGameView({allPieceContent, initialPieceNum, displaySpeed, 
    getCurrentPieceNum, notifyFinished, notifyNotYet, getInImmedaiteFinishSignal, getAutoModeStatus,
    triggerNextPiece

}) {
  
    const [currentPieceNum, setCurrentPieceNum] = useState(0);

    const [displayedContent, setDisplayedContent] = useState("");
    const [displayLength, setDisplayLength] = useState(0);
    const [continueRefreshing, setContinueRefreshing] = useState(true);

    const [fullContent, setFullContent] = useState(allPieceContent[initialPieceNum]["content"]);
    const [receivedImmediateFinishSignal, setReceivedImmediateFinishSignal] = useState(false);

    useEffect(() => {
        let displayedContentTemp = displayedContent;

        let immFinSignal = getInImmedaiteFinishSignal();
        setReceivedImmediateFinishSignal(immFinSignal);

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

        let autoStatus = getAutoModeStatus();

        if (continueRefreshing === true || wordContent !== fullContent) {
            
                if (displayedContentTemp.length < wordContent.length) {
                    //TODO notify not finished
                    notifyNotYet();

                    if (immFinSignal === true) {
                        setDisplayedContent(wordContent);
                    } else {
                         const timeout = setTimeout(
                        () => {
                            setDisplayedContent(wordContent.substring(0, displayLength));
                            setDisplayLength(displayLength+1);
                        }, 
                        displaySpeed);
                        return () => clearTimeout(timeout); 
                    }

                } else {     
                    //TODO notify finished
                    if (autoStatus === true) {
                        triggerNextPiece();
                    }
               
                    notifyFinished();
                    setContinueRefreshing(false);
                    
               
                }

            }
    });


    return(<div>
        {displayedContent}
    </div>)
}