// Initial State
const initialState = {
  category: [],
};
// Redux: category Reducer
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_thisCategory": {
      return {
        ...state,
        counter: state.category + action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default categoryReducer;
