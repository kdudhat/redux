//What is Async action

const redux = require("redux");
//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const intialState = {
  loading: false,
  users: [],
  error: "",
};
const request = "request";
const success = "success";
const failure = "failure";

const requestAction = () => {
  return {
    type: request,
  };
};

const successAction = (user) => {
  return {
    type: success,
    payload: user,
  };
};

const errorAction = (error) => {
  return {
    type: failure,
    payload: error,
  };
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case request:
      return {
        ...state,
        loading: true,
      };
    case success:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case failure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
};

//this function is return function that accept dispatch mathod
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(requestAction());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const user = response.data.map((user) => user.id);
        dispatch(successAction(user));
      })
      .catch((error) => {
        dispatch(errorAction(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});
//this work in async menner that not wait for action update state
store.dispatch(fetchUsers());
//if i dispatch action after upper(async) dispatch call so below dispatch call before above dipatch call complete
//store.dispatch(action)
