function createStore() {
  // The store should have four parts
  // 1. The state.
  // 2. Get teh state.
  // 3. Listen to changes on the state.
  // 4. Update the state.

  let state;

  const getState = () => state;

  return {
    getState,
  };
}
