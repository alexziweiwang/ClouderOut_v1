export const sizeLookupMap = { 
    "16:9(horizonal)": [800, 450],
    "16:9(vertical)": [450, 800],
    "4:3(horizonal)": [800, 600],
    "4:3(vertical)": [600, 800]
};

export const projectNavUiTemplate = {
    "screenSize": "4:3(horizonal)",
    "defaultCornerRadius": 0,
    
    "isWithSL": false,
    "fontFamilyForAll": "serif",

    "mainPage-story": true,
    "mainPage-shop": true,
    "mainPage-setting": true,
    "mainPage-playerProfile": true,
    "mainPage-entriesHorizontal": false,
    "mainPage-entriesCustom": false,

    "mainPage-isBackgroundShape": false,
    "mainPage-bgShadeName": "rgb(222, 222, 235)",
    "mainPage-bgPicName": "",
    "mainPage-isListItemShape": true,
    "mainPage-listItemShadeName": "#c0cfe2",
    "mainPage-listItemPicName": "",
    "mainPage-listItemGroupX": 600,
    "mainPage-listItemGroupY": 150,
    "mainPage-listItemGroupWidth": 120,
    "mainPage-listItemGroupHeight": 60,
    "mainPage-listItemGap": 3,
    "mainPage-listItemGroupFontColor": "",
    "mainPage-listItemGroupFontSize": 10,
    "mainPage-listItemGroupCornerRadius": 0, //TODO
    "mainPage-listItemTextFont": "serif", //TODO

    "mainPage-story-isShape": false,
    "mainPage-story-shadeName": "#c0cfe2",
    "mainPage-story-picName": "",
    "mainPage-setting-isShape": false,
    "mainPage-setting-shadeName": "#c0cfe2",
    "mainPage-setting-picName": "",
    "mainPage-playerProfile-isShape": false,
    "mainPage-playerProfile-shadeName": "#c0cfe2",
    "mainPage-playerProfiley-picName": "",
    "mainPage-shop-isShape": false,
    "mainPage-shop-shadeName": "#c0cfe2",
    "mainPage-shop-picName": "",

    "mainPage-story-posX": 300,
    "mainPage-story-posY": 100,
    "mainPage-story-width": 100,
    "mainPage-story-height": 60,
    "mainPage-story-fontSize": 10,
    "mainPage-story-fontColor": "",
    "mainPage-setting-posX": 300,
    "mainPage-setting-posY": 220,
    "mainPage-setting-width": 100,
    "mainPage-setting-height": 60,
    "mainPage-setting-fontSize": 10,
    "mainPage-setting-fontColor": "",
    "mainPage-playerProfile-posX": 300,
    "mainPage-playerProfile-posY": 160,
    "mainPage-playerProfile-width": 100,
    "mainPage-playerProfile-height": 60,
    "mainPage-playerProfile-fontSize": 10,
    "mainPage-playerProfile-fontColor": "",
    "mainPage-shop-posX": 300,
    "mainPage-shop-posY": 280,
    "mainPage-shop-width": 100,
    "mainPage-shop-height": 60,
    "mainPage-shop-fontSize": 10,
    "mainPage-shop-fontColor": "",

    "mainPage-story-name": "Story",
    "mainPage-setting-name": "Settings",
    "mainPage-playerProfile-name": "Player Profile",
    "mainPage-shop-name": "shop",

    "saveloadPage-isBackgroundShape": false,
    "saveloadPage-bgShadeName": "rgb(222, 222, 235)",
    "saveloadPage-bgPicName": "",
    "saveloadPage-isSlotShape": false,
    "saveloadPage-slotShadeName": "#c0cfe2",
    "saveloadPage-slotPicName": "",
    "saveloadPage-slotListIsHorizontal": false,
    "saveloadPage-slotPerPage": 3,
    "saveloadPage-slotRowCount": 2,
    "saveloadPage-slotColCount": 3,
    "saveloadPage-slotPageCount": 10,
    "saveloadPage-slotWidth": 500,
    "saveloadPage-slotHeight": 75,
    "saveloadPage-slotGap": 3, 
    "saveloadPage-groupPosX": 150,
    "saveloadPage-groupPosY": 100,
    
    "settingPage-playSpeed": true,
    "settingPage-bgmVol": true,
    "settingPage-seVol": true,
    "settingPage-entriesHorizontal": false,
    "settingPage-entriesCustom": false,

    "settingPage-isBackgroundShape": false,
    "settingPage-bgShadeName": "rgb(222, 222, 235)",
    "settingPage-bgPicName": "",
    "settingPage-isListItemShape": false,
    "settingPage-listItemShadeName": "#c0cfe2",
    "settingPage-listItemPicName": "",
    "settingPage-listItemGroupX": 130,
    "settingPage-listItemGroupY": 60,
    "settingPage-listItemGroupWidth": 550,
    "settingPage-listItemGroupHeight": 75,
    "settingPage-listItemFontSize": 20,
    "settingPage-listItemFontColor": "",
    "settingPage-listItemGap": 30,
    "settingPage-playSpeedName":"Play Speed",
    "settingPage-bgmVolName": "Background Music Volume",
    "settingPage-seVolName": "Sound Effect Volume",
    "settingPage-sliderWidth": 350,
    "settingPage-sliderHeight": 50,
    "settingPage-sliderColor": "#0373fc",

    "playerProfilePage-isBackgroundShape": false,
    "playerProfilePage-bgShadeName": "rgb(222, 222, 235)",
    "playerProfilePage-bgPicName": "",
    "playerProfilePage-itemMap": [],

    "playerProfilePage-previewingTextObj-isPreviewing": false,
    "playerProfilePage-previewingTextObj-textContent": "",
    "playerProfilePage-previewingTextObj-textItalic": false,
    "playerProfilePage-previewingTextObj-textFontSize": 12,
    "playerProfilePage-previewingTextObj-textFont": "serif",
    "playerProfilePage-previewingTextObj-textColor": "#000000",
    "playerProfilePage-previewingTextObj-posX": 30,
    "playerProfilePage-previewingTextObj-posY": 50,

    "playerProfilePage-previewingValueObj-isPreviewing": false,
    "playerProfilePage-previewingValueObj-labelText": "",
    "playerProfilePage-previewingValueObj-valueItemType": "Game Data",
    "playerProfilePage-previewingValueObj-valueItemName": "",
    "playerProfilePage-previewingValueObj-posX": 30,
    "playerProfilePage-previewingValueObj-posY": 70,
    "playerProfilePage-previewingValueObj-textFontSize": 12,
    "playerProfilePage-previewingValueObj-textFont": "serif",
    "playerProfilePage-previewingValueObj-textColor": "#000000",

    "playerProfilePage-previewingPicObj-isPreviewing": false,
    "playerProfilePage-previewingPicObj-posX": 50,
    "playerProfilePage-previewingPicObj-posY": 50,
    "playerProfilePage-previewingPicObj-picName": "",
    "playerProfilePage-previewingPicObj-width": 200,
    "playerProfilePage-previewingPicObj-height": 200,

    "playerProfilePage-playerProfileNickNameItem-adding": true,
    "playerProfilePage-playerProfileNickNameItem-nicknameLabel": "",
    "playerProfilePage-playerProfileNickNameItem-textContent": "",
    "playerProfilePage-playerProfileNickNameItem-textItalic": false,
    "playerProfilePage-playerProfileNickNameItem-textFontSize": 12,
    "playerProfilePage-playerProfileNickNameItem-textFont": "serif",
    "playerProfilePage-playerProfileNickNameItem-textColor": "#000000",
    "playerProfilePage-playerProfileNickNameItem-posX": 357,
    "playerProfilePage-playerProfileNickNameItem-posY": 300,

    "playerProfilePage-playerProfileIconPicItem-adding": true,
    "playerProfilePage-playerProfileIconPicItem-posX": 275,
    "playerProfilePage-playerProfileIconPicItem-posY": 50,
    "playerProfilePage-playerProfileIconPicItem-width": 200,
    "playerProfilePage-playerProfileIconPicItem-height": 200,
    "playerProfilePage-playerProfileIconPicItem-scale": 1,



    "shopPage-isBackgroundShape": false,
    "shopPage-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-bgPicName": "",
    
    "shopPage-listItem-isBackgroundShape": false,
    "shopPage-listItem-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-listItem-bgPicName": "",
    "shopPage-listItem-width": 150,
    "shopPage-listItem-height": 200,
    "shopPage-listItem-gap": 15,
    "shopPage-listItem-groupX": 0,
    "shopPage-listItem-groupY": 30,
    "shopPage-listItem-cornerRadius": 0,
    "shopPage-listItem-buyText": "Buy",   
    "shopPage-listItem-infoText": "Info",

    "shopPage-bConfWindow-width": 500,
    "shopPage-bConfWindow-height": 200,
    "shopPage-bConfWindow-textColor": "#000000",
    "shopPage-bConfWindow-bgColor": "pink",
    "shopPage-bConfWindow-cornerRadius": 0,
    "shopPage-bConfWindow-cancelText": "Cancel",    
    "shopPage-bConfWindow-confirmText": "Confirm",    
        

    "storyPage-chapterListHorizontal": false,
    "storyPage-isBackgroundShape": false,
    "storyPage-bgShadeName": "rgb(222, 222, 235)",
    "storyPage-bgPicName": "",
    "storyPage-isListItemShape": true,
    "storyPage-listItemShadeName": "#c0cfe2",
    "storyPage-listItemPicName": "",
    "storyPage-listItemGroupX": 120,
    "storyPage-listItemGroupY": 182,
    "storyPage-listItemGroupWidth": 560,
    "storyPage-listItemGroupHeight": 45,
    "storyPage-listItemGap": 25,
    "storyPage-listItemGroupFontColor": "",
    "storyPage-listItemGroupFontSize": 22,

    "gsdPage-isBackgroundShape": false,
    "gsdPage-bgShadeName": "rgb(222, 222, 235)",
    "gsdPage-bgPicName": "",

    "backButton-width": 50,
    "backButton-height": 50,
    "backButton-isShape": false,
    "backButton-shapeColor": "#c0cfe2",
    "backButton-picName": "",
    "backButton-displayText": "←",
    "backButton-fontSize": 15,

    "outWindow-askContent": "Are you sure to quit the story?",
    "outWindow-width": 200,
    "outWindow-height": 90,
    "outWindow-Btn-cornerRadius": 0,
    "outWindow-Btn-color": "grey",
    "outWindow-Btn-textColor": "#FFFFFF",
    "outWindow-Btn-confirmingText": "confirm",
    "outWindow-Btn-cancellingText": "cancel",
    "outWindow-horizontalCentred": true,
    "outWindow-verticalCentred": true,
    "outWindow-windowCornerRadius": 0,
    "outWindow-posX": 200,
    "outWindow-posY": 230,
    "outWindow-isShape": false,
    "outWindow-color": "pink",
    "outWindow-picName": "",
}

export const gameUIDefaultButtonTemplate  = {
    "widthMin": 300,
    "widthMax": 370,
    "height": 39,
    "cornerRadius": 9,
    "transparency": 0.9,
    "isShape": true,
    "bgColor": "#eead81",
    "picVar": "",
    "textColor": "#000000",
    "margin": 5,
    "justifyContent": "start",
    "alignItems": "center",
    "border": "0px solid #d1d1d1",
    "textSize": 21,
    "groupX": 179.5,
    "groupY": 100,
    "horizontalMid": true,
    "verticalMid": false,

    "fontName": "cursive",
    "isFontItalic": false,

}; 

export const gameUITextFrameTemplate = {"width": 600,
    "height": 200,
    "positionX": 100,
    "positionY": 341,
    "cornerRadius": 36,
    "transparency": 0.7,
    "isShape": true,
    "bgColor": "#d1d1d1",
    "picVar": "",
    "fontName": "serif",
    "textSize": 30,
    "textColor": "#000000",
    "justifyContent": "start",
    "alignItems": "start",
    "border": "2px solid #000000",
    "horizontalMid": false,
    "TextContentArea-x": 39,
    "TextContentArea-y": 10,
    "TextContentArea-w": 520,
    "TextContentArea-h": 180,
    "width": 600

}; 

export const gameUIBackButtonTemplate = {
    "width": 50,
    "height": 50,
    "cornerRadius": 0,
    "transparency": 0.9,
    "isShape": false,
    "bgColor": "#a8d1d6",
    "picVar": "",
    "textColor": "blue",
    "buttonText": "←",
    "textSize": 15,
    "borderColor": "blue",
    "borderSize": 2,
    "posX": 0,
    "posY": 0,
    "fontName": "serif",

}; 

export const uiConvNavTemplate = {
    "buttonAutoIsTextFont": true,
    "buttonAutoShade0": "#b3b3b3",
    "buttonAutoPicName0": "",
    "buttonAutoShade1": "#cb9a9a",
    "buttonAutoPicName1": "",
    "buttonAutoFontName": "serif",
    "buttonAutoFontItalic": false,
    "buttonAutoDisplayText0": "Auto-off",
    "buttonAutoDisplayText1": "Auto-on",
    "buttonLogDisplayText": "Log",
    "buttonSetupDisplayText": "Settings",


    "buttonLogIsTextFont": true,
    "buttonLogPicName":  "",
    "buttonLogShade": "#b3b3b3",
    "buttonLogPicName": "",
    "buttonLogFontName": "serif",
    "buttonLogFontItalic": false,


    "buttonSetupIsTextFont": true,
    "buttonSetupPicName":  "",
    "buttonSetupShade": "#b3b3b3",
    "buttonSetupPicName": "",
    "buttonSetupFontName": "serif",
    "buttonSetupFontItalic": false,


    "textDisplaySpeed": 3,

    "groupX": 437,
    "groupY": 309,
    "groupWidth": 100,
    "groupHeight": 30,

    "cornerRadius": 0,

};

export const logPageUISettingsTemplate = {
    "closeButtonIsShape": true,
    "closeButtonShade": "",
    "closeButtonPicName": "",
    "closeButtonPositionX": 3, 
    "closeButtonPositionY": 3, 
    "closeButtonWidth": 50,
    "closeButtonHeight": 30, 
    "closeButtonCornerRadius": 0, 
    "closeButtonBorderSize": 0,
    "closeButtonBorderColor": "grey",  
    "closeButtonText": "Close",
    "closeButtonTextColor": "#000000",
    "closeButtonFontName": "cursive",

    "bgpIsShape": true,
    "bgpShade": "#eddfce",
    "bgpPicName": "",

    "groupPosX": 50,
    "groupPosY": 50,
    "groupWidth": 699,

    "groupItemGap": 10, 

    "groupBgIsShape": false,
    "groupBgShade": "#ededed",
    "groupBgpName": "",  
    
    "groupUnitCornerRadius": 18,

    "contentTextShade": "",
    "contentTextSize": 26,
    "contentTextFont": "serif",
    "contentPosX": 10,
    "contentPosY": 10,

    "speakerTextShade": "",
    "speakerTextSize": 20,
    "speakerTextFont": "cursive",
    "speakerPosX": 10,
    "speakerPosY": 10,

};

export const emptyConvNodeUiAllTemplate = {
    defaultButton: gameUIDefaultButtonTemplate,
    textFrame: gameUITextFrameTemplate,
    backButton: gameUIBackButtonTemplate,
    convNav: uiConvNavTemplate,
    logPage: logPageUISettingsTemplate
}; 

export const characterPictureCurrTemplate = {
    "picVar": "",
    "posX": 0,
    "posY": 0,
    "width": 60,
    "height": 120,
    "scale": 1  
}


export const emptyConvNodeSinglePieceTemplate = {
    "num": 1, 
    "isContentNotClkb": true,
    "content": "", 
    "speaker_name": "", 
    "bgp_pos_x": 0, 
    "bgp_pos_y": 0, 
    "bgp_width": 800, 
    "bgp_height": 600, 
    "bgp_source_varname": "",
    "chp_map": [], 
    "stnd_btn_arr": [], 
    "bgm_loop": true, 
    "bgm_source_varname": "",
    "displayTextFrame": true,
    "bgp_action": "maintainBgp", 
    "chp_action": "maintainCharPicArr",
    "bgm_action": "maintainBgm", 

}

export const gdt1Template = {
    "name": "",
    "default_value": "",
    "data_type": "",
    "current_value": ""
}

export const epp2Template = {
    "playername": "",
    "userTitle": "",
    "iconPicName": "",
    "level": 1,
    "membership": "",
}

export const epa3Template = {
    "playername": "",
    "email": "",      
}

export const shp5Template = {
    "shopStock": [],
    "playerPurchaseStatus":  []
}
