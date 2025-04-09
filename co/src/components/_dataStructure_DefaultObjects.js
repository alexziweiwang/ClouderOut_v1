export const sizeLookupMap = { 
    "16:9(horizonal)": [800, 450],
    "16:9(vertical)": [450, 800],
    "4:3(horizonal)": [800, 600],
    "4:3(vertical)": [600, 800]
};

export const gameUIDefaultButtonTemplate  = {
    "widthMin": 300,
    "widthMax": 370,
    "height": 20,
    "cornerRadius": 0,
    "transparency": 0.9,
    "isShape": true,
    "bgColor": "#a8d1d6",
    "picVar": "",
    "textColor": "#000000",
    "margin": 5,
    "justifyContent": "start",
    "alignItems": "center",
    "border": "2px solid #000000",
    "textSize": 15,
    "groupX": 200,
    "groupY": 100,
    "horizontalMid": false,
    "verticalMid": false,

    "fontName": "serif",
    "isFontItalic": false,

}; 

export const gameUITextFrameTemplate = {"width": 600,
    "height": 200,
    "positionX": 100,
    "positionY": 360,
    "cornerRadius": 0,
    "transparency": 0.7,
    "isShape": true,
    "bgColor": "#a8d1d6",
    "picVar": "",
    "fontName": "serif",
    "textSize": 30,
    "textColor": "#000000",
    "justifyContent": "start",
    "alignItems": "start",
    "border": "2px solid #000000",
    "horizontalMid": false,
    "TextContentArea-x": 10,
    "TextContentArea-y": 10,
    "TextContentArea-w": 580,
    "TextContentArea-h": 180,

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

    "picPair": "" //TODO impl

}; 

export const uiConvNavTemplate = {
    "buttonAutoIsTextFont": true,
    "buttonAutoShade0": "#bf8da5",
    "buttonAutoPicName0": "",
    "buttonAutoShade1": "#4a54a1",
    "buttonAutoPicName1": "",
    "buttonAutoFontName": "serif",
    "buttonAutoFontItalic": false,
    "buttonAutoDisplayText0": "Auto-off",
    "buttonAutoDisplayText1": "Auto-on",
    "buttonLogDisplayText": "Log",
    "buttonSetupDisplayText": "Settings",


    "buttonLogIsTextFont": true,
    "buttonLogShade": "#bf8da5",
    "buttonLogPicName":  "",
    "buttonLogShade": "#4a54a1",
    "buttonLogPicName": "",
    "buttonLogFontName": "serif",
    "buttonLogFontItalic": false,


    "buttonSetupIsTextFont": true,
    "buttonSetupShade": "#bf8da5",
    "buttonSetupPicName":  "",
    "buttonSetupShade": "#4a54a1",
    "buttonSetupPicName": "",
    "buttonSetupFontName": "serif",
    "buttonSetupFontItalic": false,


    "textDisplaySpeed": 2,

    "groupX": 0,
    "groupY": 0,
    "groupWidth": 100,
    "groupHeight": 30,

    "cornerRadius": 0,

};

export const logPageUISettingsTemplate = {
    "closeButtonIsShape": false,
    "closeButtonShade": "",
    "closeButtonPicName": "",
    "closeButtonPositionX": 3, 
    "closeButtonPositionY": 3, 
    "closeButtonWidth": 50,
    "closeButtonHeight": 30, 
    "closeButtonCornerRadius": 0, 
    "closeButtonBorderSize": 1,
    "closeButtonBorderColor": "grey",  
    "closeButtonText": "Close",
    "closeButtonTextColor": "#000000",
    "closeButtonFontName": "serif",

    "bgpIsShape": false,
    "bgpShade": "",
    "bgpPicName": "",

    "groupPosX": 50,
    "groupPosY": 50,
    "groupWidth": 699,

    "groupItemGap": 10, 

    "groupBgIsShape": false,
    "groupBgShade": "",
    "groupBgpName": "",  
    
    "groupUnitCornerRadius": 0,

    "contentTextShade": "",
    "contentTextSize": 20,
    "contentTextFont": "",
    "contentPosX": 10,
    "contentPosY": 10,

    "speakerTextShade": "",
    "speakerTextSize": 20,
    "speakerTextFont": "",
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
