import { STORE_RESULT, DELETE_RESULT } from "./actionTypes";

export const saveResult = result => {
  return {
    type: STORE_RESULT,
    result
  };
};

export const storeResult = result => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // const oldCounter = getState().ctr.counter;
      // console.log(oldCounter);
      dispatch(saveResult(result));
    }, 2000);
  };
};

export const deleteResult = resultId => {
  return {
    type: DELETE_RESULT,
    resultId
  };
};
