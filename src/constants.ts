// Redux response state
export const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESSED: "successed",
  FAILED: "failed",
};
export type TypeofFetchStatus =
  (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS];
