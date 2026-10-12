
import { useReducer } from "react";

const initialState = 0;

function reducer(state, action) {
  if (action.type === "increment") {
    return state + 1;
  }

  if (action.type === "decrement") {
    return state - 1;
  }

  if (action.type === "reset") {
    return initialState;
  }

  return state;
}

function App() {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Counter App</h1>

      <h2>{count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>
        Increase
      </button>

      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrease
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}

export default App;
