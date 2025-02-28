import { createContext, ReactNode, useContext, useReducer } from "react";
import { Action, initialState, reducer, State } from "./reducerImagePicker";

interface ImageContextType {
    state: State;
    dispatch: React.Dispatch<Action>
}

export const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <ImageContext.Provider value={{ state, dispatch}}>{children}</ImageContext.Provider>
    )
}

// Custom hook to ensure context is not undefined
export const useImageContext = () => {
    const context = useContext(ImageContext);
    if(!context){
        throw new Error("useImageContext must be used within an ImageContextProvider")
    }
    return context;
}