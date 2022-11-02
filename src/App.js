import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuid } from 'uuid';
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
    
    const id = uuid();
    const updatedList = [...todoList, { id, content: inputValue, status: 'pending' }];

    setTodoList(updatedList);
    setCurrChange([...currChange, `task "${inputValue}" added to the list`]);
    setInputValue('');
  }

  const removeTask = (task, index) => {
    const updatedList = todoList.filter((_currTask, currIndex) => currIndex !== index);

    setTodoList(updatedList);
    setCurrChange([...currChange, `task "${task}" removed from the list`]);
  }

  const modifyTask = (task) => {
    let updatedList = [];

    if (task.status === 'pending') {
      updatedList = todoList.map((currTask) => {
        if (currTask.id === task.id) return { ...task, status: 'done' };

        return currTask;
      });

      setCurrChange([...currChange, `task "${task.content}" marked as finished`]);
    }

    if (task.status === 'done') {
      updatedList = todoList.map((currTask) => {
        if (currTask.id === task.id) return { ...task, status: 'pending' };

        return currTask;
      });

      setCurrChange([...currChange, `task "${task.content}" marked as pending`]);
    }

    setTodoList(updatedList);
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
      {
        todoList.length === 0 ?
          'No task added' :
          <TodoList list={todoList} removeTask={removeTask} modifyTask={modifyTask} />
      }
    </section>
  );
}

export default App;
