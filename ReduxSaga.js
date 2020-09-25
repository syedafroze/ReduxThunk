const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
const initialState = {
  loading: false,
  user: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchRequest=()=>{
  return {
    type: FETCH_USERS_REQUEST
  }
}
const fetchUser = function (userData) {
  return {
    type: "fetchUser",
    userData: userData,
  };
};



const fetchError=(error)=>{
  return {
    type:FETCH_USERS_FAILURE,
    payload:error
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_REQUEST":
      return {
        loading: false,
        users:action.payload,
        error:''
      };
    case "FETCH_USERS_REQUEST":
      return {
        laoding:false,
        users:[],
        error:action.payload
      };

    default:
      return state;
  }
};

const AsynFun = () => {
  return function (dispatch) {
    dispatch(fetchRequest())
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      const users = response.data.map((user) => user.id);
      dispatch(fetchUser(users));
    })
    .catch(error =>{
      dispatch(fetchError(error.message))
    })
  };
};


function* handleAsync(){
  yield axios
}





function* fetchUser(){
   yield takeEvery("fetchUser",handleAsync)
}

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

store.subscribe(() => console.log(store.getState()));
store.dispatch(AsynFun());
