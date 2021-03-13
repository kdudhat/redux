const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
//this middleware use for logged state
const logger = reduxLogger.createLogger();

//intial State
const intialState = {
  count: 10,
};

//Action
function decrementCount() {
  return {
    type: "DECREMENT_COUNT",
    info: "first reduc action",
  };
}

function incrementCount() {
  return {
    type: "INCREMENT_COUNT",
    info: "first reduc action",
  };
}
//Reducer
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
//Create Store with reducer(required) and middleware(optinal)
const store = createStore(reducer, applyMiddleware(logger));

//get updated state value
const unsubscribe = store.subscribe(() => {});

//dispatch method with passing action
//this work in sync menner one call complete after that called
store.dispatch(decrementCount());
store.dispatch(incrementCount());
store.dispatch(decrementCount());

//unsunscibe store so no  more to access
unsubscribe();
