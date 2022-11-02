import React, { useContext, useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import { v4 as uuid } from 'uuid';
import HistoryContext from '../context/HistoryContext';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { taskList, setTaskList, historyList, setHistoryList } = useContext(HistoryContext);

  useEffect(() => {
    if (inputValue.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputValue]);

  useEffect(() => setHistoryList(historyList), [historyList, setHistoryList]);
  
  const handleInputChange = ({target}) => setInputValue(target.value);

  const addTask = (e) => {
    e.preventDefault();
    
    const id = uuid();
    const updatedList = [...taskList, { id, content: inputValue, status: 'pending' }];

    setTaskList(updatedList);
    setHistoryList([...historyList, `task "${inputValue}" added to the list`]);
    setInputValue('');
  }

  const removeTask = (task, index) => {
    const updatedList = taskList.filter((_currTask, currIndex) => currIndex !== index);

    setTaskList(updatedList);
    setHistoryList([...historyList, `task "${task}" removed from the list`]);
  }

  const modifyTask = (task) => {
    let updatedList = [];

    if (task.status === 'pending') {
      updatedList = taskList.map((currTask) => {
        if (currTask.id === task.id) return { ...task, status: 'done' };

        return currTask;
      });

      setHistoryList([...historyList, `task "${task.content}" marked as finished`]);
    }

    if (task.status === 'done') {
      updatedList = taskList.map((currTask) => {
        if (currTask.id === task.id) return { ...task, status: 'pending' };

        return currTask;
      });

      setHistoryList([...historyList, `task "${task.content}" marked as pending`]);
    }

    setTaskList(updatedList);
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
      <span>{historyList[historyList.length - 1]}</span>
      {
        taskList.length === 0 ?
          'No task added' :
          <TodoList list={taskList} removeTask={removeTask} modifyTask={modifyTask} />
      }
      <br />
      <Link to='/history'>View history</Link>
    </section>
  );
}

export default Home;
