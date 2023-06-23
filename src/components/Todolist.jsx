import { useState } from "react";
import deleteIcon from "/icons8-delete.svg";

export default function Todolist({ val, deleteFunc, checkFunc }) {
  const [isChecked, setisChecked] = useState(val.checked);
  return (
    <div className="todo-list">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setisChecked(1 - isChecked)}
        onClick={(e) => checkFunc(val._id, 1-isChecked)}
        className="checkbox"
        key={val._id + "a"}
      />
      <div
        className="todo-description"
        style={isChecked ? { textDecoration: "line-through" } : {}}
        key={val._id + "b"}
      >
        {val.description}
      </div>
      <img
        src={deleteIcon}
        alt="delete_icon"
        className="delete-todo"
        onClick={() => deleteFunc(val._id)}
      />
    </div>
  );
}
