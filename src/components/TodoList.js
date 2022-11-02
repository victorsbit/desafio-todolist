import React from "react";
import PropTypes from 'prop-types';

function TodoList({ list }) {
  return (
    <ul>
      {list.map((task, index) => (
        <li key={`${task}-${index}`}>
          {task}
        </li>
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
};

export default TodoList;
