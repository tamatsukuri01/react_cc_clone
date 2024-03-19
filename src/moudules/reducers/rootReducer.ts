import { combineReducers } from "redux";
import { GetPokemonResponse } from "../getPokemonApi";

const rootReducer = combineReducers({
  GetPokemonResponse,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
