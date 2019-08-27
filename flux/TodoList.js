import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
  render () {
    const { todoList, statusChoice } = this.props;
    return (
      <div>
        {
          todoList.map((todoItem, index) => {
            const id = todoItem.get('id');
            const value = todoItem.get('value');
            const status = todoItem.get('status');
            if (statusChoice === 'all' || statusChoice === status) {
              return (
                <TodoItem
                  key={id}
                  index={index}
                  value={value}
                  status={status}
                />
              );
            }
          })
        }
      </div>
    );
  }
}

export default TodoList;
