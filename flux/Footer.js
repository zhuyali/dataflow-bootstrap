import React from 'react';
import { Button } from 'antd';

import TodoActions from './data/TodoActions';

class Footer extends React.Component {
  render () {
    const { leftNumber, onStatusChoiceChange } = this.props;
    return (
      <div className='footer'>
        <span>{leftNumber} items left</span>
        <div className='btn-group'>
          <Button size='small' onClick={() => onStatusChoiceChange('all')}>All</Button>
          <Button size='small' onClick={() => onStatusChoiceChange('todo')}>Active</Button>
          <Button size='small' onClick={() => onStatusChoiceChange('finished')}>Completed</Button>
        </div>
        <Button type='link' onClick={() => TodoActions.deleteCompletedTodos()}>
          Clear Completed
        </Button>
      </div>
    );
  }
}

export default Footer;
