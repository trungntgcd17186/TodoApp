import reducer from "./reducer";

function logger() {
  return (prevState, action) => {
    console.group(action.action);
    console.log("Prev State", prevState);
    console.log("Payload: ", action.payload);

    const nextState = reducer(prevState, action);

    console.log("Next State", nextState);
    console.groupEnd();

    return nextState;
  };
}

export default logger;
