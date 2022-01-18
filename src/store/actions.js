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

export const addJob = (dispatch) => {
  return {
    type: "add_job",
    payload: dispatch,
  };
};

export const deleteJob = (payload) => {
  return {
    type: "delete_job",
    payload,
  };
};

export const changeEdit = (dispatch) => {
  return {
    type: "change_edit",
    payload: dispatch,
  };
};
