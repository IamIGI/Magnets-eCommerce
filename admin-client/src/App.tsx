import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { SERVER_URL } from './config/envVariables';

// Define the interface
export interface ToDoObject {
  userName: string;
  title: string;
  isDone?: boolean;
  date?: string;
  index?: number;
}

function App() {
  const [todos, setTodos] = useState<ToDoObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch todos
    const fetchTodos = async () => {
      try {
        const response = await axios.get<ToDoObject[]>(
          `${SERVER_URL}/todolist/all`
        );
        setTodos(response.data); // Set fetched todos to state
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.index || index}>
            <strong>{todo.title}</strong> - {todo.userName}{' '}
            {todo.isDone ? 'Done' : 'not done'}
            {todo.date && <span> | Date: {todo.date}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
