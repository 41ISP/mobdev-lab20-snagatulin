import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import { getObject, setObject } from './utils/utils';

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Простой способ генерации уникального ID
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Функция для переключения статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Функция для удаления задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Фильтрация задач в зависимости от выбранного фильтра
  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos; // 'all'
  };

useEffect(() => {
  // Функция для загрузки данных
  const loadData = async () => {
    const todos = await getObject("todos")// Ваш код загрузки
    setTodos(todos || [])
  };
  
  loadData();
}, []); // Пустой массив зависимостей = выполнится один раз при монтировании

useEffect(() => {
  // Функция для сохранения данных
  const saveData = async () => {
   setObject("todos", todos) // Ваш код сохранения
  };  
  saveData();
}, [todos]); // Выполнится каждый раз, когда изменится todos

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Мои задачи</h1>
      
      <TodoForm onAdd={addTodo} />
      
      <FilterButtons 
        currentFilter={filter} 
        onFilterChange={setFilter} 
      />
      
      <TodoList 
        todos={getFilteredTodos()} 
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
