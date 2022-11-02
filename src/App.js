import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [currChange, setCurrChange] = useState('');

  useEffect(() => {
    if (inputValue.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputValue]);

  const addTask = (e) => {
    e.preventDefault();

    const updatedList = [...todoList, inputValue];
    setTodoList(updatedList);
    setCurrChange(`task "${inputValue}" added in the list`);
    setInputValue('');
  }

  const removeTask = (task, index) => {
    const updatedList = todoList.filter((_currTask, currIndex) => currIndex !== index);

    setTodoList(updatedList);
    setCurrChange(`task "${task}" remove from the list`);
  }

  const handleInputChange = ({target}) => setInputValue(target.value);

  return (
    <section className='main-container'>
      <form onSubmit={addTask}>
        <input
          type='text'
          onChange={handleInputChange}
          value={inputValue}
        />
        <span>{currChange}</span>
        <button
          type='submit'
          disabled={disabled}
        >
          Add task
        </button>
      </form>
      <TodoList list={todoList} removeTask={removeTask} />
    </section>
  );
}

export default App;
