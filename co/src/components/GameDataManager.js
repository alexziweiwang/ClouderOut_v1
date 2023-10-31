

export default function GameDataManager({isDisplay, handleGdmCancel}) {
    let modalStyleName = "modalBackboard";
    const username = "user002"; //TODO testing

    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

//TODO game-data manager can be a modal (pop-up window) for the author to add/remove variable, its type, and default value

    console.log("this is game data manager..."); //TODO testing
    
    return (
    <div className={modalStyleName}>

    <div className="modalArea3">

    <div className="modalContent">
        <p> This is game-data manager!!!!!!!!! </p>
        <button className="modalControlButton" onClick={handleGdmCancel}> Close </button>

    </div> 
    
    
    
    </div> 
    
    </div>
    );
}