import React from 'react';
import { Button } from 'antd';

class Footer extends React.Component {
  render () {
    const { leftNumber, onStatusChoiceChange, clearCompleted } = this.props;
    return (
      <div className='footer'>
        <span>{leftNumber} items left</span>
        <div className='btn-group'>
          <Button size='small' onClick={() => onStatusChoiceChange('all')}>All</Button>
          <Button size='small' onClick={() => onStatusChoiceChange('todo')}>Active</Button>
          <Button size='small' onClick={() => onStatusChoiceChange('finished')}>Completed</Button>
        </div>
        <Button type='link' onClick={clearCompleted}>
          Clear Completed
        </Button>
      </div>
    );
  }
}

export default Footer;
