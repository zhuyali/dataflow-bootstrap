import React from 'react';
import { Checkbox, Input, Icon } from 'antd';

class TodoItem extends React.Component {
  render () {
    const { value, status, onStatusChange, onRemoveItem } = this.props;
    const isChecked = status === 'finished';
    const className = `${status}-item`
    return (
      <div className={`${className} item`}>
        <Input 
          value={value}
          readOnly
          size="large"
          placeholder="What needs to be done?" 
          prefix={
            <Checkbox checked={isChecked} className={className} onChange={onStatusChange} />
          }
          suffix={
            <Icon type="close" onClick={onRemoveItem} />
          }/>
        
      </div>
    );
  }
}

export default TodoItem;