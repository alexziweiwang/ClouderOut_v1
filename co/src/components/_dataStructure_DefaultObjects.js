export const sizeLookupMap = { 
    "16:9(horizonal)": [800, 450],
    "16:9(vertical)": [450, 800],
    "4:3(horizonal)": [800, 600],
    "4:3(vertical)": [600, 800]
};

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
