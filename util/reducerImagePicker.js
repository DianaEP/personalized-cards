import { colors } from "../UI/theme"

export const ACTIONS = {
    SET_PHOTO: 'SET_PHOTO',
    TOGGLE_COLOR_PICKER: 'TOGGLE_COLOR_PICKER',
    SET_CHOSEN_COLOR: 'SET_CHOSEN_COLOR',
    SET_OVERLAY_TEXT: 'SET_OVERLAY_TEXT',
    ADD_TEXT_ON_IMAGE: 'ADD_TEXT_ON_IMAGE',
    SET_TEXT_POSITION: 'SET_TEXT_POSITION',
    TOGGLE_SVG_MODAL: 'TOGGLE_SVG_MODAL',
    SELECT_SVG_ID: 'SELECT_SVG_ID',
    SET_SVG_POSITION: 'SET_SVG_POSITION',
    SET_SVG_SCALE: 'SET_SVG_SCALE',
    SET_SVG_COLOR: 'SET_SVG_COLOR',
    SET_TARGET_COLOR: 'SET_TARGET_COLOR',
}

export const reducer =(state, action) => {
    switch (action.type) {
        case ACTIONS.SET_PHOTO:
            return { ...state, photoTaken: action.payload}
            
        case ACTIONS.TOGGLE_COLOR_PICKER:
            return{ ...state, showColorPicker: !state.showColorPicker}
            
        case ACTIONS.SET_CHOSEN_COLOR:
            return{ ...state, chosenColor: action.payload}
            
        case ACTIONS.SET_OVERLAY_TEXT:
            return{ ...state, overlayText: action.payload}
            
        case ACTIONS.ADD_TEXT_ON_IMAGE:
            return{ ...state, textOnImage: state.overlayText, overlayText: ''}
            
        case ACTIONS.SET_TEXT_POSITION:
            
            return { ...state, textPosition: action.payload};
        case ACTIONS.TOGGLE_SVG_MODAL:
            
            return { ...state, showSvgModal: !state.showSvgModal};
        
        case ACTIONS.SELECT_SVG_ID:
            
            return { ...state, selectedSvgId: action.payload, showSvgModal: !state.showSvgModal};

        case ACTIONS.SET_SVG_POSITION:
            
            return { ...state, svgPosition: action.payload};

        case ACTIONS.SET_SVG_SCALE:
            return { ...state, svgScale: action.payload };

        case ACTIONS.SET_SVG_COLOR:
            return{ ...state, svgColor: action.payload}
        
        case ACTIONS.SET_TARGET_COLOR:
            return { ...state, targetColor: action.payload };

        default:
            return state;
    }
}


export const initialState = {
    photoTaken: null,
    showColorPicker: false,
    chosenColor: colors.titleText,
    overlayText: '',
    textOnImage: null,
    textPosition: { x: 0, y: 0 },
    showSvgModal: false,
    selectedSvgId: null,
    svgPosition: { x: 0, y: 0 },
    svgScale: 1,
    svgColor: colors.line,

}