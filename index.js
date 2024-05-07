////////////////////////LIBRARY CODE//////////////////
function createStore(reducer) {
  // The store should have four parts
  // 1. The state.
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state.

  // 1. The state.
  let state;
  let listeners = [];

  // 2. Get the state.
  const getState = () => state;

  // 3. Listen to changes on the state.
  const subscribe = (listener) => {
    listeners.push(listener);

    //to be used by client to unsuscribe.
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  //4. update the state.
  const dispatch = (action) => {
    state = reducer(state, action); //call the reducer, to update the state.
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}
////////////////////////LIBRARY CODE//////////////////

////////////////////////APP CODE//////////////////////

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

//Action creators.
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

/**
 * Characteristics of a pure function -
 * 1. They always return the same result if the same arguments are passed to them.
 * 2. They depend only on the argument passed into them.
 * 3. Never product any side effects (Should have no interaction with the outside world.)
 */
//Reducer function (Must be pure function)
//Created the user of the library, thats why
//not included in the createStore().
//Todos reducer - updates and return todo part of the state.
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]); //not push! concat returns a new array.
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

//Goals reducer. Updates and returns goals part of the state.
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

//Combines all state in the app.
//The root reducer.
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action), //todos state
    goals: goals(state.goals, action), //goals state
  };
}

const store = createStore(app);
////////////////////////APP CODE//////////////////////
