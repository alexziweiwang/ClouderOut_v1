import { useState } from 'react';

export default function GameUIInnerPlay({dataObj, gameUIObj}) {
    const screenWidth = 800;
    //TODO change later: static info of game-UI
    //TODO change later: separate for text-frame-play
    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    const [isDisplayDefualtBtnUISettings, setIsDisplayDefualtBtnUISettings] = useState({}); //TODO remove later
    const [defualtBtnUISettings, setDefualtBtnUISettings] = useState({}); //TODO remove later
    const [txtFrameUISettings, setTxtFrameUISettings] = useState({}); //TODO remove later
    const [backButtonUISettings, setBackButtonUISettings] = useState({}); //TODO remove later

    let textFrameSettings = gameUIObj["textFrame"];
    let backButtonSettings = gameObj["backButton"];
    let defaultButtonGroupSettings = gameObj["defaultButtonGroup"];
    let isDefaultButtonDisplay = dataObj.displayTextFrame;
//TODO window width and height


    
    return (
        <div style={{"width": screenWidth}}>
   
        <div style={{"left": `${defualtBtnUISettings["groupX"]}px`,
            "top": `${defualtBtnUISettings["groupY"]}px`,                       
            "position": "absolute"}}>

        </div>
    </div>


    );

}