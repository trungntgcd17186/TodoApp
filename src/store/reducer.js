import { SET_JOB, ADD_TODO, DELETE_TODO, CHANGE_EDIT } from "./constants";
const initState = {
  todos: [],
};
const reducer = (state = initState, action) => {
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

      const deletedTodos = {
        ...state,
        todos: newTodos.filter((el) => el.id !== action.payload),
      };

      return deletedTodos;

    case CHANGE_EDIT:
      const newChangeTodos = [...state.todos];
      const changeEditedTodos = {
        ...state,
        todos: newChangeTodos.map((el) =>
          el.id === action.payload.id
            ? { ...el, todo: action.payload.todo }
            : el
        ),
      };

      return changeEditedTodos;

    default:
      throw new Error("Invalid action.");
  }
};

export default reducer;
