import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

type Todo = {
  id: string;
  title: string;
}

function TodoItem({ todo }:{todo : Todo}) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item p-2">
      <button onClick={() => dispatch(deleteTodo(todo.id))} className="btn btn-danger float-end"> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}
          className="btn btn-primary float-end me-2"> Edit </button>
      {todo.title}
    </li>
  );
}
export default TodoItem;