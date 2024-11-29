import { useState, useEffect } from 'react';

import langDictionary from './textDictionary';





export default function GameScreen_AllNodeTypeContainer({
    getNodeType, 
    getChapterKey, 
    getNodeKey,
}) {




    const [currNodeType, setCurrNodeType] = useState("");
    const [currNodeKey, setCurrNodeKey] = useState("");
    const [currChapterKey, setCurrChapterKey] = useState("");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);   //TODO temp
    useEffect(() => {
 
        if (firstTimeEnter === true) {
            //TODO
            setFirstTimeEnter(false);
        }

        //TODO

        let nodeTypeTemp = getNodeType();
        setCurrNodeType(nodeTypeTemp);

        let chapterKeyTemp = getChapterKey();
        setCurrChapterKey(chapterKeyTemp);

        let nodeKeyTemp = getNodeKey();
        setCurrNodeKey(nodeKeyTemp);


        

    });








return (<div>


</div>);


}