import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Todolist from "../components/Todolist";
import Navbar from "../components/Navbar";
import { SERVER_BASE_URL } from "../secret";

export default function Todo() {
  const [todo_data, settodo_data] = useState([]);
  const navigate = useNavigate();

  async function handleAdd(e) {
    e.preventDefault();
    if (!e.target.childNodes[0].value) {
      return;
    }

    try {
      let res = await axios.post(SERVER_BASE_URL + "/api/addTodo", {
        description: e.target.childNodes[0].value,
        token: localStorage.getItem("auth-token"),
      });
      settodo_data([res.data[0], ...todo_data]);
      e.target.childNodes[0].value = "";
    } catch (error) {
      if (error.response.data.name === "JsonWebTokenError") {
        localStorage.clear();
        navigate("/");
      }
      console.log(error.response.data);
    }
  }

  async function handleDelete(todoId) {
    try {
      let res = await axios.post(SERVER_BASE_URL + "/api/deleteTodo", {
        todoId,
        token: localStorage.getItem("auth-token"),
      });
      loadTodos();
    } catch (error) {
      if (error.response.data.name === "JsonWebTokenError") {
        localStorage.clear();
        navigate("/");
      }
      console.log(error.response.data);
    }
  }

  async function handleCheck(todoId, checked) {
    try {
      let res = await axios.post(SERVER_BASE_URL + "/api/clickTodo", {
        todoId,
        checked,
        token: localStorage.getItem("auth-token"),
      });
    } catch (error) {
      if (error.response.data.name === "JsonWebTokenError") {
        localStorage.clear();
        navigate("/");
      }
      console.log(error.response.data);
    }
  }

  async function loadTodos() {
    try {
      let fetchResult = await axios.post(SERVER_BASE_URL + "/api/getTodos", {
        token: localStorage.getItem("auth-token"),
      });
      settodo_data(fetchResult.data);
    } catch (error) {
      if (error.response.data.name === "JsonWebTokenError") {
        localStorage.clear();
        navigate("/");
      }
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="todo h-screen w-screen flex flex-col justify-center items-center py-5">
      <Navbar />
      <div className="todo-frame h-full">
        <h1 className="text-3xl font-bold">To-Do</h1>
        <div className="todo-main">
          <form className="todo-input" onSubmit={(e) => handleAdd(e)}>
            <input
              type="text"
              name="description"
              id="input-text"
              placeholder="Create your task here..."
              required
            />
            <button type="submit">Add</button>
          </form>
          <div className="todo-lists">
            {todo_data.map((val, i, arr) => {
              return (
                <Todolist
                  val={val}
                  deleteFunc={handleDelete}
                  checkFunc={handleCheck}
                  key={val._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
