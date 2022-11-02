import React from "react";
import PropTypes from 'prop-types';

function TodoList({ list, removeTask, modifyTask }) {
  return (
    <ul>
      {list.map((task, index) => (
        <div key={index}>
          <li
            key={`${task}-${index}`}
            onClick={ (event) => modifyTask(event, task) }
          >
            { index < 10 ? `0${index} - ${task}` : `${index} - ${task}`}
          </li>
          <button
            type='button'
            onClick={ () => removeTask(task, index) }
          >
            X
          </button>
        </div>
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
};

export default TodoList;
