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

    default:
      return state;
  }
};
