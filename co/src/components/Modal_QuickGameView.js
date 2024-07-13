export default function Modal_QuickGameView ({handleQViewCancel, isDisplay, allPieceData, uiData1_textframe, uiData2_buttonOption, uiData3_ConvNavigation}) {
//TODO: receive nav-data (for all game type ) ; do later


    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }



    return ( <div className={modalStyleName}>
        <div className="modalArea">

            <div>
            <button onClick={()=>{handleQViewCancel();}}> Close </button>

                <div>

                    Preview Area ...
                </div>


                </div>
                </div>

    </div>);
}