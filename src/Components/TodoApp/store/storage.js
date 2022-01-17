const storage = {
  setStorage(todos) {
    return localStorage.setItem("todos", JSON.stringify(todos));
  },
  getStorage() {
    return JSON.parse(localStorage.getItem("todos"));
  },
};

export default storage;
