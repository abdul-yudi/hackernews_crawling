import Cookies from "js-cookie";

// Initial state
export const initialState = {
  "router": false,
  "isAuthenticated": false,
  "token": null,
  "user": null,
  "products": null,
  "product": null
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "CHECKTOKEN":
      const dataUser = JSON.parse(Cookies.get('user') || null);
      const authenticated = dataUser ? true : false;
      const token = dataUser ? dataUser.token : null;
      const user = dataUser ? dataUser : null;
      return{
        ...state,
        "router": true,
        "isAuthenticated": authenticated,
        "token": token,
        "user": user,
      }
    case "LOGIN":
      Cookies.set('token', JSON.stringify(action.payload.token), {expires: 7});
      Cookies.set('user', JSON.stringify(action.payload), {expires: 7});
      return {
        ...state,
        "isAuthenticated": true,
        "user": action.payload
      };
    case "PRODUCTS":
      return {
        ...state,
        "products": action.payload.data
      };
    case "PRODUCT":
      return {
        ...state,
        "product": action.payload.data
      };
      case "DELETEPRODUCT":
        return {
          ...state,
          "product": action.payload.data
        };
    case "LOGOUT":
      Cookies.remove("user");
      return {
        ...state,
        "isAuthenticated": false
      };
    default:
      return state
  }
};

export default reducer;