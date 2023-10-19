import styles from './webpage.css';

export default function ResourceManagingModal ({handleRmCancel, handleRmSaveChanges, isDisplay}) {
    let modalStyleName = "modalBackboard";
    
    if (isDisplay == true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }
  
    return (
      <div className={modalStyleName}>

        <div className="modalArea">

            <div className="modalContent">
                TODO... (resource manager)
            </div>

            <div className="modalControl">
                <button className="modalControlButton" onClick={handleRmCancel}> Cancel </button>
                <button className="modalControlButton" onClick={handleRmSaveChanges}> Save Changes </button>
            </div>
            
        </div>
      </div>
    );
  };