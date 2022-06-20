import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import SingleTodo from "./SingleTodo";
import FilterCat from "./FilterCat";
import "./Todo.css";
import TodoCreate from "./TodoCreate";

import { useAuth } from "../../Contexts/AuthContext";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState(0);

  const getTodos = () => {
    axios.get(`https://localhost:7197/api/ToDoes`).then(response => {
      setTodos(response.data);
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <section className="todos">
      <article className="bg-dark p-3 text-white">
        <h1 className="text-center">To-Do</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ?
          <>
          <button onClick={() => setShowCreate(false)} className='btn btn-light'>Cancel</button>
          <TodoCreate
            getTodos={getTodos}
            setShowCreate={setShowCreate}/>
            </> :
            <button className="btn btn-light" onClick={() => setShowCreate(true)}>Create To Do</button>}
            </div>
}
      <FilterCat setFilter={setFilter} />
      <Container className="p-2">
        <table className="table bg-dark table-dark mt-3 mb-3 text-center">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>To-Do</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {filter === 0 ? todos.map(x => 
            <SingleTodo 
            key={x.toDoId} 
            toDo={x} 
            getTodos={getTodos}/>
            ) : 
            todos.filter(x => x.categoryId === filter).map((x) => 
                  <SingleTodo 
                  key={x.toDoId} 
                  toDo={x} 
                  getTodos={getTodos}/>
            )
}
            {filter !== 0 &&
              todos.filter((x) => x.categoryId === filter).length === 0 && (
                <h3 className="alert alert-warning text-white text-center bg-dark">
                  There are no results for this category.
                </h3>
              )}
          </tbody>
        </table>
      </Container>
    </section>
  );
}
