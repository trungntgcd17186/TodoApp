import "./style.css";
import { Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState, useReducer, useRef } from "react";
import reducer from "./store/reducer";
import {
  initState,
  setJob,
  addJob,
  deleteJob,
  changeEdit,
  completeTodo,
} from "./store/actions";
import logger from "./store/logger";

function Todo() {
  const [todosList, dispatch] = useReducer(logger(reducer), initState);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [text, setText] = useState(false);
  const inputRef = useRef();

  const handleAddTodo = () => {
    dispatch(addJob(todosList.todo));
    todosList.todo = "";
    inputRef.current.focus();
  };

  const handleEditTodo = (index) => {
    dispatch(setJob(todosList.todos[index]));
    setEdit(true);
    setId(index);
    inputRef.current.focus();
  };

  //handle edit acception
  const handleChangeEdit = () => {
    dispatch(
      changeEdit({
        id,
        todo: todosList.todo,
      })
    );
    setEdit(false);
  };

  const handleCompleteTodo = () => {
    setText(!text);
  };

  return (
    <div className="App" style={{ padding: 32 }}>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="headerTodo">
                <h4 className="card-title">Todo App</h4>
              </div>
              <div className="card px-3">
                <div className="card-body">
                  <div className="add-items d-flex">
                    <input
                      ref={inputRef}
                      value={todosList.todo}
                      placeholder="Enter todo..."
                      onChange={(e) => {
                        dispatch(setJob(e.target.value));
                      }}
                    />
                    {edit ? (
                      <Button
                        onClick={handleChangeEdit}
                        style={{ marginLeft: "20px" }}
                      >
                        Lưu
                      </Button>
                    ) : (
                      <Button
                        className="add btn btn-primary font-weight-bold todo-list-add-btn"
                        onClick={handleAddTodo}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  <div className="ul-container">
                    <ul>
                      {todosList.todos.map((job, index) => (
                        <li key={index} className="liJobs">
                          <div
                            className={text === true ? "active" : ""}
                            onClick={handleCompleteTodo}
                          >
                            {job}
                          </div>

                          <div className="btnEditDelete">
                            <Button onClick={() => handleEditTodo(index)}>
                              <FaEdit />
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => dispatch(deleteJob(index))}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Todo;
