// Initial state
export const initialState = {
  loading: true
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
