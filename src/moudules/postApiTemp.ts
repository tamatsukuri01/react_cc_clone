import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "./reducers/rootReducer";
import { fetchInApi, getTokenSet } from "@/function/tokenManager";
import { FETCH_STATUS, TypeofFetchStatus } from "@/constants";

let controller: AbortController;

const BASE_URL = `test/api`;

/////////////////////////////////////
// Data Structure
//
type CreateFolderResult = { folder_id: string; display_name: string };

///////////////////////////////////////
// Actions & Action Creators
//
const START = "START_CREATE_FOLDER";
const SUCCESS = "SUCCESS_CRATE_FOLDER";
const FINISH = "FINISH_CREATE_FOLDER";
const ERROR = "ERROR_CREATE_FOLDER";
const CANCEL = "CANCEL_CREATE_FOLDER";

type Action = ActionSuccess & ActionOther;
type ActionSuccess = { type: string; payload: CreateFolderResult };
type ActionOther = { type: string };

const start = (): { type: string } => {
  controller = new AbortController();
  return { type: START };
};
const success = (payload: CreateFolderResult): ActionSuccess => ({
  type: SUCCESS,
  payload,
});
export const finish = (): ActionOther => ({ type: FINISH });
const error = (): ActionOther => {
  if (controller.signal.aborted) {
    return { type: CANCEL };
  }
  return {
    type: ERROR,
  };
};

export const cancel = (): ActionOther => {
  controller?.abort();
  return { type: CANCEL };
};

/////////////////////////////////////
// State
//
type State = {
  payload: CreateFolderResult;
  fetchStatus: TypeofFetchStatus;
};

const initialState: State = {
  payload: { folder_id: "", display_name: "" },
  fetchStatus: FETCH_STATUS.IDLE,
};

/////////////////////////////////
// Reducer
//
export const createFolder = (
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
        payload: action.payload,
        fetchStatus: FETCH_STATUS.SUCCESSED,
      };
    }
    case FINISH: {
      return {
        ...initialState,
      };
    }
    case ERROR: {
      return {
        ...state,
        fetchStatus: FETCH_STATUS.FAILED,
      };
    }
    case CANCEL: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

type CreateFolderApi = (
  dispatch: Dispatch,
  getState: () => RootState
) => Promise<void>;
export type CreateFolderApiProps = {
  display_name: string;
  app_id?: string;
};
export const createFolderApi = (
  props: CreateFolderApiProps
): CreateFolderApi => {
  const { display_name, app_id } = props;

  return async (dispatch) => {
    try {
      dispatch(start());

      const { access_token } = getTokenSet();
      const response = await fetchInApi(`${BASE_URL}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        signal: controller?.signal,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name,
          app_id: app_id,
        }),
      });
      if (!response.ok) throw new Error();
      const res: CreateFolderResult = await response.json();

      dispatch(success({ ...res, display_name }));
    } catch {
      dispatch(error());
    }
  };
};
