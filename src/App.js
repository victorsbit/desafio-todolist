import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [disabled, setDisabled] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currChange, setCurrChange] = useState([]);
  

  useEffect(() => {
    if (inputValue.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputValue]);
  
  const handleInputChange = ({target}) => setInputValue(target.value);

  const addTask = (e) => {
    e.preventDefault();

    const updatedList = [...todoList, {inputValue}];
    setTodoList(updatedList);
    setCurrChange([...currChange, `task "${inputValue}" added to the list`]);
    setInputValue('');
  }

  const removeTask = (task, index) => {
    const updatedList = todoList.filter((_currTask, currIndex) => currIndex !== index);

    setTodoList(updatedList);
    setCurrChange([...currChange, `task "${task}" removed from the list`]);
  }

  const modifyTask = ({ target }, task) => {
    const { className } = target;

    if (className !== 'done') {
      target.className = 'done';
      setCurrChange([...currChange, `task "${task}" was marked as finished`]);
    } else {
      target.className = '';
      setCurrChange([...currChange, `task "${task}" was marked as pending`]);
    }
  }

  return (
    <section className='main-container'>
      <h1>To Do List</h1>
      <form onSubmit={addTask}>
        <input
          type='text'
          onChange={handleInputChange}
          value={inputValue}
          placeholder='add your task'
        />
        <button
          type='submit'
          disabled={disabled}
        >
          Add task
        </button>
      </form>
      <span>{currChange[currChange.length - 1]}</span>
      <TodoList list={todoList} removeTask={removeTask} modifyTask={modifyTask} />
    </section>
  );
}

export default App;
