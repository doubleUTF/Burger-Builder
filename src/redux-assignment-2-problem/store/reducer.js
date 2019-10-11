import * as actions from "./actions";

const initialState = {
  persons: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PERSON:
      return { ...state, persons: [...state.persons, action.value] };
    case actions.DELETE_PERSON:
      console.log("deleting", action.value);
      return {
        ...state,
        persons: state.persons.filter(person => person.id != action.value)
      };
    default:
      return state;
  }
};

export default reducer;
