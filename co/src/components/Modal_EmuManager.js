import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';
import { fetchEmuData1GdtVM, fetchEmuData2EppVM, fetchEmuData3EpaVM, fetchEmuData4EssVM } from '../viewmodels/EmuManagingViewModel';


export default function Modal_EmuManager({
    isDisplay,
    handleEmCancel,
    getUILanguage,
    update1Gdt, update2Epp, update3Epa, update4Ess,
    isForGameMaker,


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
    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    let closeText = textDictItem.closeText !== undefined ?
        textDictItem.closeText
        : textDictItemDefault.closeText;

    const [gdt1, setGdt1] = useState({});
    const [epp2, setEpp2] = useState({});
    const [epa3, setEpa3] = useState({});
    const [ess4, setEss4] = useState({});


    const [focusingPanelName, setFocusingPanelName] = useState("");

    const namingMap = {
        "1gdt": "1.Game Data to Test",
        "2epp": "2.Emu Player Profile",
        "3epa": "3.Emu Player Account",
        "4ess": "4.Emu SL slots"
    }

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    function update1GdtToOuterLayer() {
        //gdt1
        update1Gdt(gdt1);
    }

    function update2EppToOuterLayer() {
        //epp2 
        update2Epp(epp2);
    }

    function update3EpaToOuterLayer() {
        //epa3
        update3Epa(epa3);
    }

    function update4EssToOuterLayer() {
        //ess4
        update4Ess(ess4);
    }


    function fetch1GdtFromCloud () {
        // if local is not ready, from cloud
//fetchEmuData1GdtVM

    } 
    function fetch2EppFromCloud () {
        // if local is not ready, from cloud
//fetchEmuData2EppVM
    }        
    function fetch3EpaFromCloud () {
        // if local is not ready, from cloud
//fetchEmuData3EpaVM
    }              
    function fetch4EssFromCloud () {
        // if local is not ready, from cloud
//fetchEmuData4EssVM

    }



    
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

            <button className="cursor_pointer modalClose buttonRight50" 
                onClick={()=>{
                    setFocusingPanelName("");
                    handleEmCancel();
                }}
            >{closeText}</button>

            <div style={{
                "width": "900px",
                "marginLeft": "20%",
                "borderRadius": "0px"
            }}>
{isForGameMaker === true && <div className="someGrey parallelFrame"
                    style={{
                        "borderRadius": "0px"
                    }}
                >
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


</div>}

                {((isForGameMaker === true && focusingPanelName === "1gdt") || isForGameMaker === false) && <div>
                {/* "1.Game Data to Test" */}
                {/* for Game-Maker and other Node-Level Editor */}
                    <div>Game Data (When start testing)</div>
                        
                        <div 
                            className="darkerGrey"
                            style={{
                                "width": "900px",
                                "height": "500px",
                                "borderRadius": "0px"
                            }}
                        >
                            TODO: setup initial-values of game-data-tracker ...





                        </div>
                </div>}




{/* for Game-Maker-Level only */}
{isForGameMaker === true && <>
                {focusingPanelName === "2epp" && <div>
                {/* "2.Emu Player Profile" */}
2
                </div>}
                
                {focusingPanelName === "3epa" && <div>
                {/* "3.Emu Player Account" */}
3
                </div>}

                {focusingPanelName === "4ess" && <div>
                {/* "4.Emu SL slots" */}
4
                </div>}

</>}

            </div>


        </div>




</div>
</div>);
}