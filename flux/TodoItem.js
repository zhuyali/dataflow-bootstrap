import React from 'react';
import { Checkbox, Input, Icon } from 'antd';

import TodoActions from './data/TodoActions';

class TodoItem extends React.Component {
  render () {
    const { value, status, index } = this.props;
    const isChecked = status === 'finished';
    const className = `${status}-item`;
    return (
      <div className={`${className} item`}>
        <Input
          value={value}
          readOnly
          size='large'
          placeholder='What needs to be done?'
          prefix={
            <Checkbox checked={isChecked} className={className} onChange={() => TodoActions.toggleTodo(index)} />
          }
          suffix={
            <Icon type='close' onClick={() => TodoActions.deleteTodo(index)} />
          } />

      </div>
    );
  }
}

export default TodoItem;
