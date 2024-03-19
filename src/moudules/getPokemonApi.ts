import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "./reducers/rootReducer";
import { getTokenSet } from "@/function/tokenManager";
import { fetchInApi } from "@/function/tokenManager";
import { FETCH_STATUS, TypeofFetchStatus } from "@/constants";

const USER_ID = "{user_id}";
// const BASE_URL = `test/api/${USER_ID}`;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon/`;

/////////////////////////////////////
// Data Structure
//
export type GetApiRequest = {
  user_id: string;
};

export type PokemonDatas = {
  name: string;
  url: string;
};

export type GetPokemonApiResponse = {
  count: number;
  next: string;
  previous: null | string;
  results: PokemonDatas[];
};

///////////////////////////////////
// Status type
//
export const STATUS_TYPE = {
  OFF: "off",
  ON: "on",
} as const;
export type STATUS_TYPE = (typeof STATUS_TYPE)[keyof typeof STATUS_TYPE];

export const IMAGE_TYPE = {
  OFF: "off",
  ON: "on",
} as const;
export type IMAGE_TYPE = (typeof IMAGE_TYPE)[keyof typeof IMAGE_TYPE];

export const VIDEO_TYPE = {
  OFF: "off",
  ON: "on",
} as const;
export type VIDEO_TYPE = (typeof VIDEO_TYPE)[keyof typeof VIDEO_TYPE];

///////////////////////////////////////
// Actions & Action Creators
//
const START = "START_GET_RESPONSE";
const SUCCESS = "SUCCESS_GET_RESPONSE";
const ERROR = "ERROR_GET_RESPONSE";

type Action = ActionSuccess;
type ActionSuccess = { type: string; payload: GetPokemonApiResponse };

const start = (): { type: string } => ({ type: START });
const success = (response: GetPokemonApiResponse): ActionSuccess => ({
  type: SUCCESS,
  payload: response,
});
const error = (): { type: string } => ({ type: ERROR });

/////////////////////////////////////
// State
//
type State = {
  response: GetPokemonApiResponse;
  fetchStatus: TypeofFetchStatus;
};

// export const initialState: State = {
//   response: {
//     status: STATUS_TYPE.OFF,
//     forder_id: "",
//     image: {
//       jpeg: IMAGE_TYPE.OFF,
//     },
//     video: {
//       hd: VIDEO_TYPE.OFF,
//     },
//     flag: false,
//   },
//   fetchStatus: FETCH_STATUS.IDLE,
// };

export const initialState: State = {
  response: { count: 0, next: "", previous: null, results: [] },
  fetchStatus: FETCH_STATUS.IDLE,
};

/////////////////////////////////
// Reducer
//
export const GetPokemonResponse = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case START: {
      return {
        ...state,
        fetchStatus: FETCH_STATUS.LOADING,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        response: action.payload,
        fetchStatus: FETCH_STATUS.SUCCESSED,
      };
    }
    case ERROR: {
      return {
        ...state,
        fetchStatus: FETCH_STATUS.FAILED,
      };
    }
    default:
      return state;
  }
};

///////////////////////////////
// Dispatch function
//

type GetPokemonResponseApi = (
  dispatch: Dispatch,
  getState: () => RootState
) => Promise<void>;

export const getPokemonResponseApi = (): GetPokemonResponseApi => {
  return async (dispatch) => {
    try {
      dispatch(start());

      const { access_token } = getTokenSet();
      // const { user_id } = props;
      const response = await fetchInApi(`${BASE_URL}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        // headers: {
        //   Authorization: `Bearer ${access_token}`,
        //   "Content-Type": "application/json",
        // },
      });
      // console.log(response);
      if (!response) throw new Error();

      const res: GetPokemonApiResponse = await response.json();
      console.log("res", res);
      dispatch(success(res));
    } catch {
      dispatch(error());
    }
  };
};
