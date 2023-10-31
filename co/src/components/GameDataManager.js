import { useState, useEffect } from 'react';


export default function GameDataManager({isDisplay, handleGdmCancel, gameData, resetNeedCloudData, fetchFromCloud}) {
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

    function addNewVarPair() {
        //TODO update game-data variable: name, type, default-value to cloud db
        //TODO also trigger update of layout's above area: all game data pairs...
        resetNeedCloudData();
        fetchFromCloud();
        setDisplayNewVarArea(false);
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
            <button onClick={showNewVarForm}> + New Variable </button>
            {displayNewVarArea && 
                <div>
                    <p className="plans">
                        variable name
                        <br></br>data type (options: text, number, true/false)
                        <br></br>default value
                    </p>
                    <button onClick={addNewVarPair}>Submit</button>
                </div>
            }

        </div>


        <button className="modalControlButton" onClick={handleGdmCancel}> Close </button>

    </div> 
    
    
    
    </div> 
    
    </div>
    );
}