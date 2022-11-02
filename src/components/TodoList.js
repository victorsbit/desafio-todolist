import React from "react";
import PropTypes from 'prop-types';

function TodoList({ list, removeTask, modifyTask }) {
  return (
    <ul>
      {list.map((task, index) => (
        <div key={index}>
          <li
            key={`${task.content}-${index}`}
            className={task.status}
            onClick={() => modifyTask(task)}
          >
            {index < 10 ? `0${index} - ${task.content}` : `${index} - ${task.content}`}
          </li>
          <button
            type='button'
            onClick={() => removeTask(task.content, index)}
          >
            X
          </button>
        </div>
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
  removeTask: PropTypes.func.isRequired,
  modifyTask: PropTypes.func.isRequired
};

export default TodoList;
