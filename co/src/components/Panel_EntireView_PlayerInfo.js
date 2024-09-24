import { useState, useEffect } from 'react';


export default function Panel_EntireView_PlayerInfo({
    getScreenHeight, getScreenWidth,
    updatePlayerInfoSets,
    fetchPlayerInfoSets,
    fetchPicResourceList,
    initialPicResourceList,
}) {

    const [screenHeight, setScreenHeight] = useState(450);
    const [screenWidth, setScreenWidth] = useState(800); //TODO

    const [playerProfile, setPlayerProfile] = useState(-1);
    const [userAccountData, setUserAccountData] = useState(-1);



    const [inputUsername, setInpuUsername] = useState("");
    const [inputIconPicName, setInputIconPicName] = useState("");

    const [picList, setPicList] = useState(initialPicResourceList);

    const [picMap, setPicMap] = useState({});


    console.log("initialPicResourceList = ", initialPicResourceList); //TODO testing
       
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        if (firstTimeEnter === true) {
            let obj = fetchPlayerInfoSets();
            setPlayerProfile(obj["playerProfile"]);
            setUserAccountData(obj["userAccount"]);

            setupPictureList(true);



            setFirstTimeEnter(false);
        }
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);

        
       
   

    });


    function setupPictureList(isFirst) {
        let picListTemp = fetchPicResourceList();
        setPicList(picListTemp);

        if (isFirst === true) {
            let i = 0;
            let tempPicMap = {};
            for (;i < picList.length; i++) {
                let item = picList[i];
                tempPicMap[item["var"]] = item["url"];
            }
            setPicMap(tempPicMap);
        }

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
        <div className="indentOne">
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
        </div>
       
        <br></br><br></br>

        <label>Icon: </label>
        <div className="indentOne">
            <div style={{
                "backgroundColor": "orange",
                "borderRadius": "0px",
                "width": "150px",
                "height": "150px"
                
                }}>
        
            </div>
            <br></br>
            <select
            //TODO (value=player-profile info's icon-pic-name)
                onChange={(event)=>{
                    //TODO change player-profile info's icon-pic-name
                    let selectedPicName = event.target.value;

console.log("selectedPicName = ", selectedPicName); //TODO testing

                

                }}
            >
                <option key="panel-playerInfo-Pic-defaultNone" value="">-- Select Picture Name --</option>
                {picList.map((item, index) => {
                    let keyStr = "panel-playerInfo-Pic" + index + item["var"];
                    return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                })}

            </select>
            <br></br>
            <button>Change</button>

        </div>
        <br></br>

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