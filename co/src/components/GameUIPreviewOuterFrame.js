import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIPureContent from './GameUIPureContent';

export default function GameUIPreviewOuterFrame({dataObj, getTextFrameData, getIsDisplayDefaultButton, getDefaultButtonData, getBackButtonData}) {
    // const [isDisplayDefualtBtnData, setIsDisplayDefualtBtnData] = useState({});

    // const [defualtBtnData, setDefualtBtnData] = useState({});
    // const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    // const [txtFrameData, setTxtFrameData] = useState({});

    // const [backButtonData, setBackButtonData] = useState({});

    // useEffect(() => {
        
    //     let txtFramedata = getTextFrameData();
    //     setTxtFrameData(txtFramedata);
    //     let isDisplayDefaultVal = getIsDisplayDefaultButton();
    //     setIsDisplayDefualtBtnData(isDisplayDefaultVal);
    //     let defaultBtnData = getDefaultButtonData();
    //     setDefualtBtnData(defaultBtnData);
    //     let backBtnData = getBackButtonData();
    //     setBackButtonData(backBtnData);

    // });
    

    return(<div className="previewWindow">


            <div className="preveiewArea2">



  
        <GameUIPureContent dataObj={dataObj} getTextFrameData={getTextFrameData} getIsDisplayDefaultButton={getIsDisplayDefaultButton} getDefaultButtonData={getDefaultButtonData} getBackButtonData={getBackButtonData}/> 
                </div>

        <div> <br></br><br></br><br></br>Outside: <br></br>
            A1. Title Screen
            <br></br>
            A2. Pause Screen 
        </div>


        <div>
            <p className="plans">
                The opening-menu (title screen):
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>
                TODO: opening music selection
                <br></br>
                TODO: player profile/account feature
                <br></br>Current design: [start game, load game, settings, gallery(future)]
            </p>

            <p className="plans">
                The in-game menu (pause screen):
                <br></br>
                TODO: pause effect (modal-like)
                <br></br>
                TODO: a series of buttons (table) to allow users to add
                <br></br>Current design: [save, load, settings, properties, store(future)]
            </p>


            <p className="plans">
                The Game Progress save/load managing page:
                <br></br>
                TODO: allow authors to arrangne save/load spots
                <br></br>
                TODO: trigger of saving [game progress + game state]
            </p>



        </div>



    
    </div>);
}