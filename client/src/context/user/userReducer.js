export default (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        message: null,
        users: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        message: null,
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        message: action.payload,
      };
    case "UPDATE_FAIL":
      return {
        ...state,
        message: action.payload,
      };
    case "SUB":
      return {
        ...state,
        user: action.payload,
      };
    case "UNSUB":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
