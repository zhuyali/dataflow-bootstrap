import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
  render () {
    const { todoList, onStatusChange, onRemoveItem, statusChoice } = this.props;
    console.log(statusChoice)
    return (
      <div>
        {
          todoList.map((todoItem, index) => {
            const { id, value, status } = todoItem;
            if (statusChoice === 'all' || statusChoice  === status) {
              return (
                <TodoItem
                  key={id}
                  value={value}
                  status={status}
                  onRemoveItem={() => onRemoveItem(index)}
                  onStatusChange={() => onStatusChange(index)} />
              );
            }
          })
        }
      </div>
    );
  }
}

export default TodoList;