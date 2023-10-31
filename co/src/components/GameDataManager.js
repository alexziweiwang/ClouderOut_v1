import { useState, useEffect } from 'react';


export default function GameDataManager({isDisplay, handleGdmCancel, gameData}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [displayNewVarArea, setDisplayNewVarArea] = useState(false);

//TODO game-data manager: to add/remove variable, its type, and default value

    function showNewVarForm() {
        setDisplayNewVarArea(!displayNewVarArea);
    }

    return (
    <div className={modalStyleName}>

    <div className="modalArea3">

    <div className="modalContent">
        <p> This is game-data manager!!!!!!!!! </p>
        <div className="gameDataDisplayArea">

            <ul>
                {
                Object.keys(gameData).map((key) => {
                return (
                    <li key={key}>{key}:{gameData[key]}</li>
                )
                })}
            </ul>
            <button onClick={showNewVarForm}> Add New Variable </button>
            {displayNewVarArea && 
                <div>
                
                
                </div>
            }

        </div>


        <button className="modalControlButton" onClick={handleGdmCancel}> Close </button>

    </div> 
    
    
    
    </div> 
    
    </div>
    );
}