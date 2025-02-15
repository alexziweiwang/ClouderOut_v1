import { useState, useEffect } from 'react';


export default function Panel_EntireView_PlayerInfo({
    getScreenHeight, getScreenWidth,
    updatePlayerInfoSets,
    fetchPlayerInfoSets,
    fetchPicResourceList,
    initialPicResourceList,
    fetchProjectNavData,
    initialProjNavData,
    updateProjectNavData
}) {

    const [screenHeight, setScreenHeight] = useState(600);
    const [screenWidth, setScreenWidth] = useState(800); //TODO

    const [playerProfile, setPlayerProfile] = useState(-1);
    const [userAccountData, setUserAccountData] = useState(-1);



    const [inputUsername, setInpuUsername] = useState("");
    const [inputIconPicName, setInputIconPicName] = useState("");

    const [picMap, setPicMap] = useState({});
    const [iconPicUrl, setIconPicUrl] = useState("");
    const [iconName, setIconName] = useState("");

    const [navData, setNavData] = useState(initialProjNavData);

 //   console.log("initialPicResourceList = ", initialPicResourceList); //TODO testing
       
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        if (firstTimeEnter === true) {
            let obj = fetchPlayerInfoSets();
            setPlayerProfile(obj["playerProfile"]);
            setUserAccountData(obj["userAccount"]);

            setupPicMap();

            setFirstTimeEnter(false);
        }
        let h = getScreenHeight();
        setScreenHeight(h);
        let w = getScreenWidth();
        setScreenWidth(w);
        let navTemp = fetchProjectNavData();
        setNavData(navTemp);

    });

    function setupPicMap() {
        let tempMap = {};
        initialPicResourceList.map((item, index) => {
            let keyStr = item["var"];
            tempMap[keyStr] = item["url"];
        })
        setPicMap(tempMap);
    }



    function updateDataSetsToCaller() { //update when settings changed ...
        updatePlayerInfoSets(playerProfile, userAccountData);
    }



return (
<div 
    style={{
        "width": `350px`, 
        "height": `${screenHeight}px`, 
        "backgroundColor": "#98C1D9", 
        "position": "absolute", 
        "marginLeft": (screenWidth > screenHeight) ? `${screenWidth+230}px` : `${screenWidth+120}px`,
        
    }}
        

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
                
                <div
                    style={{
                        "width": "150px",
                        "height": "150px",
                        "border": "#3D5A80 dotted 2px",
                        "borderRadius": "0px",
                        "margin": "0px",                        
                    }}
                >
             
                    {iconPicUrl !== "" && <img 
                        style={{
                            "width": "150px",
                            "height": "150px",
                            "borderRadius": "0px",
                        }}
                        src={iconPicUrl}
                        alt="icon picture"
                    />}
                </div>
        
            <select
            //TODO (value=player-profile info's icon-pic-name)
                value={iconName}
                onChange={(event)=>{
                    let selectedPicName = event.target.value;

                    if (selectedPicName.length === 0 || selectedPicName === "") {
                        setIconPicUrl("");
                        return;
                    } else {
                   
                        let url = picMap[selectedPicName];
                        setIconPicUrl(url);     
                    }             
                    setIconName(selectedPicName);
                }}
            >
                <option key="panel-playerInfo-Pic-defaultNone" value="">-- Select Picture Name --</option>
                {initialPicResourceList.map((item, index) => {
                    let keyStr = "panel-playerInfo-Pic" + index + item["var"];
                    return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                })}

            </select>
            <br></br>
            <button
                onClick={()=>{
                    //TODO update to player-info, to-test
                    let tempNav = navData;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["picName"] = iconName;
                    updateProjectNavData(tempNav);
                    console.log("new pic: ", iconName);
                }}
            >Update</button>
            <br></br>
            <button
                onClick={()=>{
                    setIconPicUrl("");
                }}
            >Reset</button>

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