import React from "react";
import PropTypes from 'prop-types';

function TodoList({ list, removeTask, modifyTask }) {
  return (
    <ul>
      {list.map((task, index) => (
        <li
          key={`${task}-${index}`}
          onClick={modifyTask}
        >
          {`0${index} - ${task}`}
          <button
            type='button'
            onClick={ () => removeTask(task, index) }
          >
            X
          </button>
        </li>
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
};

export default TodoList;
