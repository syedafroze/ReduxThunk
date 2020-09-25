const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const initialState = {
  loading: false,
  user: [],
  error: "",
};
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
const fetchUser = function (userData) {
  return {
    type: FETCH_USERS_SUCCESS,
    userData: userData,
  };
};

const fetchError = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        loading: false,
        users: action.userData,
        error: "",
      };
    case "FETCH_USERS_FAILURE":
      return {
        laoding: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const AsynFun = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/user")
      .then((response) => {
        const users = response.data.map((user) => user.id);

        dispatch(fetchUser(users));
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));
store.dispatch(AsynFun());
