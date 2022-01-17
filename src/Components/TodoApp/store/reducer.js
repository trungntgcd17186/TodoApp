import {
  SET_JOB,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  CHANGE_EDIT,
  COMPLETE_TODO,
} from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        todo: action.payload,
      };
    case ADD_TODO:
      const addedTodos = {
        ...state,
        todos: [...state.todos, action.payload],
      };

      return addedTodos;
    case DELETE_TODO:
      const newTodos = [...state.todos];
      newTodos.splice(action.payload, 1);
      const deletedTodos = {
        ...state,
        todos: newTodos,
      };

      return deletedTodos;
    case EDIT_TODO:
      return {
        ...state,
        todo: action.payload,
      };
    case CHANGE_EDIT:
      const newChangeTodos = [...state.todos];
      newChangeTodos[action.payload.id] = action.payload.todo;
      const changeEditedTodos = {
        todo: "",
        todos: newChangeTodos,
      };

      return changeEditedTodos;
    case COMPLETE_TODO:

    default:
      throw new Error("Invalid action.");
      break;
  }
};

export default reducer;
