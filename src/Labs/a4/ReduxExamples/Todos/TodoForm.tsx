import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { LabState } from "../../../store";

function TodoForm() {
  const { todo } = useSelector((state: LabState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ul className="list-group">
      <li className="list-group-item p-2">
        <button
          onClick={() => dispatch(addTodo(todo))}
          className="btn btn-success float-end"
        >
          Add
        </button>
        <button
          onClick={() => dispatch(updateTodo(todo))}
          className="btn btn-warning float-end me-2"
        >
          Update
        </button>
        <input
          className="form-control w-50"
          value={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />
      </li>
    </ul>
  );
}
export default TodoForm;
