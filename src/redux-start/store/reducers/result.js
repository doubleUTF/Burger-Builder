import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  results: []
};

const deleteResult = (state, action) => {
  const newArray = state.results.filter(result => result.id != action.resultId);
  return updateObject(state, { results: newArray });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {
        results: [...state.results, { value: action.result, id: new Date() }]
      });
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    default:
      return state;
  }
};

export default reducer;
