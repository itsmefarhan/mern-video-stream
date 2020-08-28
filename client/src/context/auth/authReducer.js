export default (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        error: null,
        message: action.payload,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_FAIL":
      return {
        ...state,
        token: null,
        loggedInUser: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: localStorage.setItem("token", action.payload.token),
        isAuthenticated: true,
        loggedInUser: action.payload.user,
      };
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload,
      };
    case "LOGOUT":
    case "DELETE_USER":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loggedInUser: null,
        error: null,
        message: null,
        users: null,
        user: null,
      };    
    default:
      return state;
  }
};
