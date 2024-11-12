import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';

export default function EmuManager () {
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


return (<div className={modalStyleName}>

<div>

        <div className="modalContent">
            <button>close</button>

            <div>
                (emu-manager panels)
                
            </div>


        </div>




</div>
</div>);
}