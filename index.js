function createStore() {
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

  return {
    getState,
    subscribe,
  };
}

const store = createStore();
