import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HistoryContext from "../context/HistoryContext";
import './History.css';

function History() {
  const { historyList } = useContext(HistoryContext);

  return (
    <main className="history-container">
      <h1>History of tasks</h1>
      <Link className="back-home" to="/">Voltar</Link>
      <ul>
        {historyList.map((history, index) => (
          <li key={`${index}-${history}`}>{history}</li>
        ))}
      </ul>
    </main>
  )
}

export default History;
