import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';

export default function Modal_EmuManager({
    isDisplay,
    handleEmCancel,
    getUILanguage,

}) {
//allows user to setup emu-data for testing


//1.PlayerGameData (tracker)

//2.PlayerProfile (player profile for this game)

//3.PlayerAccountSettings (player account info for all games)

//4.Save/Load slot (emu)


    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    let closeText = textDictItem.closeText !== undefined ?
        textDictItem.closeText
        : textDictItemDefault.closeText;



    const [focusingPanelName, setFocusingPanelName] = useState("");

    const namingMap = {
        "1gdt": "1.Game Data to Test",
        "2epp": "2.Emu Player Profile",
        "3epa": "3.Emu Player Account",
        "4ess": "4.Emu SL slots"
    }

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    
    useEffect(() => {
        if (firstTimeEnter === true) {

            setFirstTimeEnter(false);
        }
        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);
    });



return (<div className={modalStyleName}>

<div>

        <div className="modalContent">
            
            <button
                onClick={()=>{
                    handleEmCancel();
                }}
            >{closeText}</button>

            <div>
                (emu-manager panels)
                <div>
                    <button
                        
                        onClick={()=>{
                            setFocusingPanelName("1gdt");
                        }}
                    >1.Game Data to Test</button>
                    <br></br>
                    <button

                        onClick={()=>{
                            setFocusingPanelName("2epp");
                        }}                    
                    >2.Emu Player Profile</button>
                    <br></br>
                    <button

                        onClick={()=>{
                            setFocusingPanelName("3epa");
                        }}             
                    >3.Emu Player Account</button>
                    <br></br>
                    <button

                        onClick={()=>{
                            setFocusingPanelName("4ess");
                        }}             
                    >4.Emu SL slots</button>
                </div>

                {focusingPanelName === "1gdt" && <div>
1
                </div>}

                {focusingPanelName === "2epp" && <div>
2
                </div>}
                
                {focusingPanelName === "3epa" && <div>
3
                </div>}

                {focusingPanelName === "4ess" && <div>
4
                </div>}

            </div>


        </div>




</div>
</div>);
}