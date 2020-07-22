import { GET_ROUTE, getRoutes } from "../actions/routes";

const initialState = {
  routes: {},
  isAuth: false,
};

export default (state = initialState, action) =>
{
  switch (action.type) {
    case GET_ROUTE:
      getRoutes(state);
    default:
      return state;
  }
}
