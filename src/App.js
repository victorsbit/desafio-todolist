import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (inputValue.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputValue]);

  const addTask = () => {
    const updatedList = [...todoList, inputValue];
    setTodoList(updatedList);
  }

  const handleChange = ({target}) => setInputValue(target.value);

  return (
    <section className='main-container'>
      <input
        type='text'
        onChange={handleChange}
        value={inputValue}
      />
      <button
        type='button'
        onClick={addTask}
        disabled={disabled}
      >
        Add task
      </button>
      <TodoList list={todoList} />
    </section>
  );
}

export default App;
