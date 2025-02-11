import { fonts } from "../UI/fonts";
import { colors } from "../UI/theme"
import { Position } from "../util/interfaces";




// Action interface for each possible action
type ActionsType =  
    'SET_PHOTO'| 
    'TOGGLE_COLOR_PICKER' | 
    'SET_CHOSEN_COLOR'|
    'SET_OVERLAY_TEXT'| 
    'ADD_TEXT_ON_IMAGE'| 
    'SET_TEXT_POSITION'|
    'SET_TEXT_FONT'|
    'TOGGLE_SVG_MODAL'|
    'SELECT_SVG_ID'|
    'SET_SVG_POSITION'|
    'SET_SVG_SCALE'|
    'SET_SVG_COLOR'|
    'SET_SVG_ROTATION'|
    'SET_TARGET_COLOR'|
    'SET_FINAL_IMAGE_URI'|
    'RESET_STATE';

export interface Action {
    type: ActionsType;
    payload?: any;
}


export interface State  {
    photoTaken: string | null;
    showColorPicker: boolean;
    chosenColor: string;
    overlayText: string;
    textOnImage: string | null;
    textPosition: Position;
    textFont: string;
    showSvgModal: boolean;
    selectedSvgId: string | null,
    svgPosition: Position;
    svgScale: number;
    svgColor: string;
    svgRotation: number;
    targetColor: string;
    finalImageUri: string | null;
}

export const ACTIONS = {
    SET_PHOTO: 'SET_PHOTO',
    TOGGLE_COLOR_PICKER: 'TOGGLE_COLOR_PICKER',
    SET_CHOSEN_COLOR: 'SET_CHOSEN_COLOR',
    SET_OVERLAY_TEXT: 'SET_OVERLAY_TEXT',
    ADD_TEXT_ON_IMAGE: 'ADD_TEXT_ON_IMAGE',
    SET_TEXT_POSITION: 'SET_TEXT_POSITION',
    SET_TEXT_FONT: 'SET_TEXT_FONT',
    TOGGLE_SVG_MODAL: 'TOGGLE_SVG_MODAL',
    SELECT_SVG_ID: 'SELECT_SVG_ID',
    SET_SVG_POSITION: 'SET_SVG_POSITION',
    SET_SVG_SCALE: 'SET_SVG_SCALE',
    SET_SVG_COLOR: 'SET_SVG_COLOR',
    SET_SVG_ROTATION: 'SET_SVG_ROTATION',
    SET_TARGET_COLOR: 'SET_TARGET_COLOR',
    SET_FINAL_IMAGE_URI: 'SET_FINAL_IMAGE_URI',
    RESET_STATE: 'RESET_STATE'
} as const; // `as const` ensures that the action types are literal values immutables instead of just strings

export const initialState: State = {
    photoTaken: null,
    showColorPicker: false,
    chosenColor: colors.titleText,
    overlayText: '',
    textOnImage: null,
    textPosition: { x: 0, y: 0 },
    textFont: fonts.body2,
    showSvgModal: false,
    selectedSvgId: null,
    svgPosition: { x: 0, y: 0 },
    svgScale: 1,
    svgColor: colors.line,
    svgRotation: 0,
    targetColor: 'text',
    finalImageUri: null

}

export const reducer =(state: State, action: Action) => {
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

        case ACTIONS.SET_TEXT_FONT:
            return { ...state, textFont: action.payload};

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

        case ACTIONS.SET_SVG_ROTATION:  
            return { ...state, svgRotation: action.payload };
        
        case ACTIONS.SET_TARGET_COLOR:
            return { ...state, targetColor: action.payload };

        case ACTIONS.SET_FINAL_IMAGE_URI:
            return { ...state, finalImageUri: action.payload };

        case ACTIONS.RESET_STATE:
            const newState = { 
                ...initialState,
                finalImageUri: state.finalImageUri 
            };
            return newState;

        default:
            return state;
    }
}


