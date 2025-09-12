import React from 'react';
import { useState, useEffect } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { IoClipboardOutline } from "react-icons/io5";
import axios from './axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoApp() {

  const [todo, setnewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    try {
      const res = await axios.post("/todos",
        { text: todo }
      );
      console.log(res.data);
      setTodos([...todos, res.data.newTodo]);
      setnewTodo("");

      console.log(todos.length);
      console.log("this is all todos ", todos)

    } catch (err) {
      console.log("Error adding todo:", err);
    }
  };


  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todos");
      console.log(res.data.todos);
      setTodos(res.data.todos);

    } catch (error) {
      console.log("Error fetching todos:", error)

    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must login first!');
      window.location.href = '/';
      return;
    }
    fetchTodos();
  }, [])

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  }


  const saveEdit = async (id) => {
    try {
      const res = await axios.patch(`/todos/${id}`,
        { text: editedText }
      );

      setTodos(todos.map((todo) => (todo._id === id ? res.data.updatedTodo : todo)));
      setEditingTodo(null);
      toast.success('Todo updated!');
    } catch (err) {
      console.log("Error updating todo", err);
    }
  }


  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted!');
    } catch (error) {
      console.log("Error deleting todd:", error)
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);

      const res = await axios.patch(`/todos/${id}`,
        { completed: !todo.completed }
      );

      setTodos(todos.map((t) => t._id === id ? res.data.updatedTodo : t));

    } catch (error) {
      console.log("Error toggline todo", error);

    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100
    flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8'>
        <div>
          <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>Task Manager</h1>
        </div>

        <form
          onSubmit={addTodo}
          className='flex items-center gap-2 shadow-sm border-gray-200
       p-2 rounded-lg'>
          <input
            className='flex-1 text-gray-700 outline-none px-3 py-2 placeholder-gray-400'
            type='text'
            value={todo}
            onChange={(e) => setnewTodo(e.target.value)}
            placeholder='what needs to be done?'
            required
          />
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4
        py-2 rounded-md font-medium' >
            Add Task
          </button>
        </form>
        <div className='mt-4'>
          {todos && todos.length === 0 ? (
            <div></div>
          ) : (
            <div className='flex flex-col gap-4'>
              {todos && todos.map((todo, index) => (
                <div key={index}>
                  {editingTodo === todo._id ? (
                    <div className='flex items-center gap-x-3'>
                      <input
                        className='flex-1 p-3 border border-gray-200 outline-none rounded-lg
                     focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner'
                        type='text'
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className='flex gap-x-2 '>
                        <button className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer'
                          onClick={(e) => saveEdit(todo._id)}>
                          <MdOutlineDone />
                        </button>
                        <button
                          className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer'
                          onClick={() => setEditingTodo(null)}>
                          <IoClose />
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div>
                      <div className='flex items-center justify-between' >
                        <div className='flex items-center gap-x-4 overflow-hidden'>
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={` flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center
                          ${todo.completed ? "bg-green-500 border-green-500" : " border-gray-300 hover:border-blue-400"

                              }`}
                          >
                            {todo.completed && < MdOutlineDone />}
                          </button>
                          <span className='text-gray-800 font-medium truncate'>
                            {todo.text}
                          </span>
                        </div>
                        <div className='flex gap-x-2 '>
                          <button
                            className='p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200'
                            onClick={() => startEditing(todo)}>
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className='p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoApp
