export const initState = {
  todo: "",
  todos: [],
};

export const setJob = (payload) => {
  return {
    type: "set_job",
    payload,
  };
};

export const addJob = (payload) => {
  return {
    type: "add_job",
    payload,
  };
};

export const deleteJob = (payload) => {
  return {
    type: "delete_job",
    payload,
  };
};

export const editTodo = (payload) => ({
  type: "edit_todo",
  payload,
});

export const changeEdit = (payload) => ({
  type: "change_edit",
  payload,
});

export const completeTodo = (payload) => ({
  type: "complete_todo",
  payload,
});
