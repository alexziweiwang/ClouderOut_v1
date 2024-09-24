import { useState, useEffect } from 'react';


export default function Panel_EntireView_PlayerInfo({
    getScreenHeight, getScreenWidth,
    updatePlayerInfoSets,
    fetchPlayerInfoSets,
    fetchPicResourceList,
}) {

    const [screenHeight, setScreenHeight] = useState(450);
    const [screenWidth, setScreenWidth] = useState(800); //TODO

    const [playerProfile, setPlayerProfile] = useState(-1);
    const [userAccountData, setUserAccountData] = useState(-1);



    const [inputUsername, setInpuUsername] = useState("");
    const [inputIconPicName, setInputIconPicName] = useState("");

    const [picList, setPicList] = useState(-1);
       
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        if (firstTimeEnter === true) {
            let obj = fetchPlayerInfoSets();
            setPlayerProfile(obj["playerProfile"]);
            setUserAccountData(obj["userAccount"]);

            setupPictureList();
      
            setFirstTimeEnter(false);
        }
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);

        
       
   

    });


    function setupPictureList() {
        let picListTemp = fetchPicResourceList();
        setPicList(picListTemp);

        console.log("got pic list: ", picListTemp); //TODO testing
    }

    function updateDataSetsToCaller() { //update when settings changed ...
        updatePlayerInfoSets(playerProfile, userAccountData);
    }



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
        <label> {playerProfile["username"]}</label>
        <br></br>
        <input 
            value={inputUsername}
            onChange={(event)=>{
                setInpuUsername(event.target.value);
            }}
        ></input>
        <button
            onClick={()=>{
                let obj = playerProfile;
                obj["username"] = inputUsername;
                setPlayerProfile(obj);
                updateDataSetsToCaller(obj, userAccountData);
                setInpuUsername("");
            }}
        >Change</button>
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