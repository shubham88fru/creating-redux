/**
 * Characteristics of a pure function -
 * 1. They always return the same result if the same arguments are passed to them.
 * 2. They depend only on the argument passed into them.
 * 3. Never product any side effects (Should have no interaction with the outside world.)
 */
//Reducer function (Must be pure function)
//Created the user of the library, thats why
//not included in the createStore().
function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]); //not push! concat returns a new array.
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE_TOOD":
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function createStore(reducer) {
  // The store should have four parts
  // 1. The state.
  // 2. Get teh state.
  // 3. Listen to changes on the state.
  // 4. Update the state.

  // 1. The state.
  let state;
  let listeners = [];

  // 2. Get teh state.
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

const store = createStore(todos);
