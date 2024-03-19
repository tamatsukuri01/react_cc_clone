import { Dispatch } from "@reduxjs/toolkit";

import { RootState } from "./reducers/rootReducer";
import { getTokenSet } from "@/function/tokenManager";
import { fetchInApi } from "@/function/tokenManager";

export const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESSED: "successed",
  FAILED: "failed",
};
export type TypeofFetchStatus =
  (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS];

const USER_ID = "{user_id}";
// const BASE_URL = `test/api/${USER_ID}`;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon/`;

/////////////////////////////////////
// Data Structure
//
export type GetApiRequest = {
  user_id: string;
};

export type GetApiResponse = {
  status: STATUS_TYPE;
  forder_id: string;
  image: {
    jpeg: IMAGE_TYPE;
  };
  video: {
    hd: VIDEO_TYPE;
  };
  flag: boolean;
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
type ActionSuccess = { type: string; payload: GetApiResponse };

const start = (): { type: string } => ({ type: START });
const success = (response: GetApiResponse): ActionSuccess => ({
  type: SUCCESS,
  payload: response,
});
const error = (): { type: string } => ({ type: ERROR });

/////////////////////////////////////
// State
//
type State = {
  response: GetApiResponse;
  fetchStatus: TypeofFetchStatus;
};

export const initialState: State = {
  response: {
    status: STATUS_TYPE.OFF,
    forder_id: "",
    image: {
      jpeg: IMAGE_TYPE.OFF,
    },
    video: {
      hd: VIDEO_TYPE.OFF,
    },
    flag: false,
  },
  fetchStatus: FETCH_STATUS.IDLE,
};

/////////////////////////////////
// Reducer
//
export const GetResponse = (
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

type GetResponseApi = (
  dispatch: Dispatch,
  getState: () => RootState
) => Promise<void>;
export const getResponseApi = (props: GetApiRequest): GetResponseApi => {
  return async (dispatch) => {
    try {
      dispatch(start());

      const { access_token } = getTokenSet();
      const { user_id } = props;
      const response = await fetchInApi(`${BASE_URL}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response) throw new Error();

      // const res:GetApiResponse = await response.json()
      // dispatch(success(res))
    } catch {
      dispatch(error());
    }
  };
};
