import { useState, useEffect } from 'react';


export default function Panel_EntireView_PlayerInfo({
    getScreenHeight, getScreenWidth,
}) {

    const [screenHeight, setScreenHeight] = useState(600);
    const [screenWidth, setScreenWidth] = useState(800); //TODO

       
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);

   

    });



return (
<div 
    style={{
        "width": `350px`, 
        "height": `${screenHeight}px`, 
        "backgroundColor": "pink", 
        "position": "absolute", 
        "marginLeft": (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+120}px`}}
    >

    (players' in-game profile)
    <div style={{"textAlign": "left", "padding": "10px"}}>
        <label>Username: </label>
        <input></input>
        <br></br><br></br>

        <label>Icon: </label>
        <div style={{
            "backgroundColor": "orange",
            "borderRadius": "0px",
            "width": "150px",
            "height": "150px"
            
            }}>
     
        </div>
        <button>Change</button><br></br><br></br>

        <label>Level: </label>
        <input></input><br></br><br></br>

        <label>Membership: </label>
        <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        
    </div>

</div>
);


}