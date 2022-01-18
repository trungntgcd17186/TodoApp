import "./style.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useState, useReducer, useRef } from "react";
import reducer from "../../store/reducer";
import {
  initState,
  setJob,
  addJob,
  deleteJob,
  changeEdit,
} from "../../store/actions";
import logger from "../../store/logger";

//Validate
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../validate/yupGlobal";

import { v4 as uuidv4 } from "uuid";

function Todo() {
  const [todosList, dispatch] = useReducer(logger(reducer), initState);

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const inputRef = useRef();

  const handleEditTodo = (id) => {
    reset({ input: todosList.todos.find((el) => el.id === id).todo });
    setId(id);
    setEdit(true);
    inputRef.current.focus();
  };
  //handle edit acception

  const handleCheckbox = (e) => {
    e.currentTarget.classList.add("lineThrough");
  };

  //Xử lý validate với Yup

  const schema = yup.object().shape({
    input: yup.string().required("Vui lòng nhập công việc!"),
  });

  const {
    register,
    reset,
    getValues,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onOrderSubmit = (data) => {
    if (edit === true) {
      if (getValues("input") !== "") {
        dispatch(
          changeEdit({
            id: id,
            todo: getValues("input"),
          })
        );
        reset({ input: "" });
        setFocus("input");
        setEdit(false);
      }
    } else {
      dispatch(addJob({ todo: data.input, id: uuidv4() }));
      reset({ input: "" });
      setFocus("input");
    }
  };

  return (
    <div className="container-Todo">
      <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
        {/* <!-- App title section --> */}
        <div className="row m-1 p-4">
          <div className="col">
            <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
              <FaCheck className="fa fa-check bg-primary text-white rounded p-2"></FaCheck>
              <u>My Todo-s</u>
            </div>
          </div>
        </div>
        {/* <!-- Create todo section --> */}
        <form
          action=""
          id="form-payment"
          onSubmit={handleSubmit(onOrderSubmit)}
        >
          <div className="row m-1 p-3">
            <div className="col col-11 mx-auto">
              <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                <div className="col">
                  <input
                    className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                    type="text"
                    ref={inputRef}
                    placeholder="Add new .."
                    onChange={(e) => {
                      dispatch(setJob(e.target.value));
                    }}
                    {...register("input")}
                  />
                  {errors.input && (
                    <p className="errors">{errors.input.message}</p>
                  )}
                </div>
                <div className="col-auto m-0 px-2 d-flex align-items-center">
                  <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">
                    Due date not set
                  </label>
                  <i className="bi bi-calendar-date"></i>
                  {edit ? (
                    <Button type="submit" style={{ marginLeft: "20px" }}>
                      Save
                    </Button>
                  ) : (
                    <div className="col-auto px-0 mx-0 mr-2">
                      <Button
                        type="submit"
                        className="add btn btn-primary font-weight-bold todo-list-add-btn"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="p-2 mx-4 border-black-25 border-bottom"></div>
        {/* <!-- View options section --> */}
        <div className="row m-1 p-3 px-5 justify-content-end">
          <div className="col-auto d-flex align-items-center">
            <label className="text-secondary my-2 pr-2 view-opt-label">
              Filter
            </label>
            <select className="custom-select custom-select-sm btn my-2">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
              <option value="has-due-date">Has due date</option>
            </select>
          </div>
          <div className="col-auto d-flex align-items-center px-1 pr-3">
            <label className="text-secondary my-2 pr-2 view-opt-label">
              Sort
            </label>
            <select className="custom-select custom-select-sm btn my-2">
              <option value="added-date-asc">Added date</option>
              <option value="due-date-desc">Due date</option>
            </select>
            <i className="bi bi-sort-down-alt"></i>
          </div>
        </div>
        {/* <!-- Todo list section --> */}
        <div className="row mx-1 px-5 pb-3 w-80">
          <div className="col mx-auto">
            {/* <!-- Todo Item 1 --> */}
            <div className="row px-3 align-items-center todo-item rounded">
              <div className="col px-1 m-1 d-flex align-items-center">
                <div className="ul-container">
                  <ul>
                    {todosList.todos.map((job, index) => (
                      <li key={index} className="liJobs">
                        <div className="checkbox-job">
                          <h4
                            className="m-0 p-0"
                            id="job"
                            onClick={handleCheckbox}
                          >
                            {job.todo}
                          </h4>
                        </div>

                        <div className="col-auto m-1 p-0 todo-actions">
                          <div className="">
                            <h5 className="m-0 p-0 px-2">
                              <FaEdit
                                className="fa fa-pencil text-info"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Edit todo"
                                onClick={() => handleEditTodo(job.id)}
                              ></FaEdit>
                            </h5>
                            <h5 className="m-0 p-0 px-2">
                              <FaTrash
                                className="fa fa-trash-o text-danger"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Delete todo"
                                onClick={() => dispatch(deleteJob(job.id))}
                              ></FaTrash>
                            </h5>
                            <div className="todo-created-info">
                              <div className="col-auto d-flex align-items-center pr-2">
                                <i className="bi bi-info-circle"></i>
                                <label className="date-label my-2 text-black-50">
                                  18th January 2022
                                </label>
                              </div>
                            </div>
                          </div>
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
  );
}
export default Todo;
