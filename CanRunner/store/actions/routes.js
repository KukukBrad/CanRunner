export const GET_ROUTE = "GET_ROUTE";

export const getRoutes = () => {
  return async (dispatch, getState) => {
    const token = getState().auth().token;
    const userId = getState().auth().userId;
    const response = await fetch(
      `https://canrunner.firebaseio.com/Routes/${userId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routes,
        }),
      }
    );
    dispatch({
      type: GET_ROUTE,
      routeData: {
        routes,
      },
    });

    const resData = await response.JSON;
    console.log(resData);
  };
};

export const updateForRoutes = () => {
  return dispatch => {
    dispatch(getRoutes);
  }
}
