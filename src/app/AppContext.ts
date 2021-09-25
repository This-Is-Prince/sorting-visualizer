import { createContext } from "react";
import { AppStateType } from "./State";
import { ActionType } from "../app/Reducer";

interface AppContextType {
  AppState: AppStateType;
  dispatch: React.Dispatch<ActionType>;
}

const AppContext = createContext({} as AppContextType);
export default AppContext;
