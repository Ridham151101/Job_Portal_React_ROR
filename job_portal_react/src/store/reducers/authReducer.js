const initialState = {
  currUser: {},
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        currUser: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        currUser: {},
        token: null,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        currUser: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;
