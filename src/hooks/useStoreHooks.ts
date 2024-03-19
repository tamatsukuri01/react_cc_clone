import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import rootReducer, { RootState } from "@/moudules/reducers/rootReducer";
import { store } from "@/pages/_app";

type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
