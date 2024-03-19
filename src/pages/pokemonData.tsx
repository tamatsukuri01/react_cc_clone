import Image from "next/image";
import { Meta } from "./meta";
import { useMediaQuery } from "@mui/material";
import { MIN_LANDSCAPE_WIDTH } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import {
  getPokemonResponseApi,
  GetPokemonApiResponse,
  PokemonDatas,
} from "@/moudules/getPokemonApi";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "@/hooks/useStoreHooks";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@/moudules/reducers/rootReducer";
import { shallowEqual } from "react-redux";
import { FETCH_STATUS } from "@/moudules/getApiTemp";
import { TypeofFetchStatus } from "@/constants";

const PokemonData = (): JSX.Element => {
  const isLandscape = useMediaQuery(MIN_LANDSCAPE_WIDTH);
  const dispatch = useDispatch();

  // ポケモンAPIのフェッチステータスを取得する
  const getPokemonFetchStatus: TypeofFetchStatus = useSelector(
    (state: RootState) => state.GetPokemonResponse.fetchStatus,
    shallowEqual
  );

  // ポケモンAPIのレスポンスを取得
  const getPokemonResponse: GetPokemonApiResponse = useSelector(
    (state: RootState) => state.GetPokemonResponse.response,
    shallowEqual
  );

  const [pokemonData, setPokemonData] = useState<PokemonDatas[]>([]);

  useEffect(() => {
    dispatch(getPokemonResponseApi() as unknown as AnyAction);
  }, [dispatch]);

  useEffect(() => {
    console.log("getPokemonFetchStatus", getPokemonFetchStatus);
    if (getPokemonFetchStatus === FETCH_STATUS.SUCCESSED) {
      console.log("getPokemonResponse", getPokemonResponse);
      setPokemonData(getPokemonResponse.results);
    }
  }, [getPokemonFetchStatus, getPokemonResponse]);
  console.log("pokemonData", pokemonData);
  return (
    <>
      <Meta />
      <div>PokemonData</div>
    </>
  );
};

export default PokemonData;
