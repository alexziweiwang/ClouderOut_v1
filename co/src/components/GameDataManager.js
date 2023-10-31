

export default function GameDataManager({isDisplay, handleGdmCancel, gameData}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

//TODO game-data manager: to add/remove variable, its type, and default value
    
    return (
    <div className={modalStyleName}>

    <div className="modalArea3">

    <div className="modalContent">
        <p> This is game-data manager!!!!!!!!! </p>

        <ul>
            {
            Object.keys(gameData).map((key) => {
            return (
                <li key={key}>{key}:{gameData[key]}</li>
            )
        })}
        </ul>

        <button className="modalControlButton" onClick={handleGdmCancel}> Close </button>

    </div> 
    
    
    
    </div> 
    
    </div>
    );
}