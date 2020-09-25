const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

//state its object

const initialState = {
  count: 0,
};

//Action creator
function increment() {
  return {
    type: "increment",
  };
}

//component -  action   reducer - store

function decrement() {
  return {
    type: "decrement",
  };
}

//Reducer

const reducer = function (state = initialState, action) {
  //action= {type:"increment"}

  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    // case "decrement":
    //   return { count: state.count - 1 };

    default:
      return state;
  }
};

const reducer2 = function (state = initialState, action) {
  //action= {type:"increment"}

  switch (action.type) {
    case "decrement":
      return { count: state.count - 1 };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer,
  reducer2,
});

//created a store
const store = createStore(rootReducer);

//subscribed to store
const unsubscribe = store.subscribe(() => console.log(store.getState()));
//dispatch an action
store.dispatch(increment()); //{count:1}
store.dispatch(increment()); //{count:2}
store.dispatch(increment()); //{count:3}
store.dispatch(decrement()); //{count:2}

unsubscribe();
store.dispatch(decrement()); //{count:2}
console.log(store.getState());
// store.dispatch(decrement());//{count:1}
// console.log(store.getState())

//getState() ;
//dispatch();
//subscribe to store
//unsubscribe
