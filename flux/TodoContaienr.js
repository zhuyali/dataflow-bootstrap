import React from 'react';
import { Input, Checkbox } from 'antd';
import { Container } from 'flux/utils';

import Footer from './Footer';
import TodoList from './TodoList';
import TodoStore from './data/TodoStore';
import TodoActions from './data/TodoActions';

class TodoContainer extends React.Component {
  static getStores () {
    return [
      TodoStore
    ];
  }

  static calculateState () {
    return {
      todoList: TodoStore.getState()
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      value: '',
      statusChoice: 'all'
    };
    this.onChange = this.onChange.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.onStatusChoiceChange = this.onStatusChoiceChange.bind(this);
  }

  onStatusChoiceChange (statusChoice) {
    this.setState({
      statusChoice
    });
  }

  onChange (e) {
    this.setState({
      value: e.target.value
    });
  }

  onPressEnter (e) {
    if (e.target.value.trim()) {
      TodoActions.addTodo(e.target.value);
    }
    this.setState({
      value: ''
    });
  }

  componentWillMount () {
    if (JSON.parse(window.localStorage.getItem('todoList') || '[]').length === 0) {
      window.localStorage.setItem('todoList', '');
    }
  }

  render () {
    const { value, todoList, statusChoice } = this.state;
    const checkedList = todoList.filter((todoItem) => todoItem.get('status') === 'finished');
    const leftItemList = todoList.filter((todoItem) => todoItem.get('status') === 'todo');
    const indeterminate = !!checkedList.size && checkedList.size < todoList.size;
    const checkAll = checkedList.size && checkedList.size === todoList.size;
    return (
      <div className='todo-contaienr'>
        <Input
          value={value}
          size='large'
          placeholder='What needs to be done?'
          prefix={
            <Checkbox
              checked={checkAll}
              indeterminate={indeterminate}
              onChange={(e) => TodoActions.toggleAllTodos(e.target.checked)} />
          }
          onChange={this.onChange}
          onPressEnter={this.onPressEnter} />
        <TodoList statusChoice={statusChoice} todoList={todoList} />
        <Footer leftNumber={leftItemList.size} onStatusChoiceChange={this.onStatusChoiceChange}  />
      </div>
    );
  }
}

export default Container.create(TodoContainer);
