export default function Modal_ConvLog({allPieceContent, initialPieceNum, getCurrPieceNum, logPageUISettings, triggerLogPageClose}) {


    const allPiece = (allPieceContent !== -1) ? allPieceContent : {};

    return (<div>

        Converasation Log...
        <button onClick={()=>{triggerLogPageClose()}}>Close</button>

    </div>)
}