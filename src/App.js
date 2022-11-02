import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import History from './pages/History';
import Home from './pages/Home';
import HistoryContext from './context/HistoryContext';

function App() {
  const [historyList, setHistoryList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  const contextValue = {
    historyList,
    setHistoryList,
    taskList,
    setTaskList
  }

  return (
    <HistoryContext.Provider value={contextValue}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/history' component={History} />
      </Switch>
    </HistoryContext.Provider>
  )
}

export default App;
