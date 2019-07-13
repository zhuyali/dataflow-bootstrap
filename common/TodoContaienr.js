import React from 'react';
import { Input, Checkbox } from 'antd';

import { uuid } from '../util';
import TodoList from './TodoList';
import Footer from './Footer';

class TodoContaienr extends React.Component {
  constructor (props) {
    super(props);
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    const checkedList = todoList.filter((todoItem) => todoItem.status  === 'finished');
    this.state = {
      value: '',
      statusChoice: 'all',
      checkAll: checkedList.length === todoList.length,
      indeterminate: !!checkedList.length &&  checkedList.length < todoList.length,
      todoList,
    };
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.clearCompleted= this.clearCompleted.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onCheckAllChange = this.onCheckAllChange.bind(this);
    this.onStatusChoiceChange = this.onStatusChoiceChange.bind(this);
  }

  onStatusChoiceChange (statusChoice) {
    this.setState({
      statusChoice
    })
  }

  clearCompleted () {
    const todoItemList = this.state.todoList.filter((todoItem) => todoItem.status  === 'todo');
    this.isCheckAll(todoItemList);
    this.setState({
      todoList: todoItemList
    });
    localStorage.setItem('todoList', JSON.stringify(todoItemList));
  }

  onRemoveItem (index) {
    const todoList = this.state.todoList.slice();
    todoList.splice(index, 1);
    this.isCheckAll(todoList);
    this.setState({
      todoList
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  onStatusChange (index) {
    const todoList = this.state.todoList.slice();
    todoList[index].status = todoList[index].status === 'todo' ? 'finished' : 'todo';
    this.isCheckAll(todoList);
    this.setState({
      todoList
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  isCheckAll (todoList) {
    const checkedList = todoList.filter((todoItem) => todoItem.status  === 'finished');
    this.setState({
      checkAll: checkedList.length === todoList.length,
      indeterminate: !!checkedList.length &&  checkedList.length < todoList.length
    });
  }

  addTodo (todoItem) {
    const todoList = this.state.todoList.concat(todoItem);
    this.setState({
      todoList
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  onChange (e) {
    this.setState({
      value: e.target.value
    });
  }

  onPressEnter (e) {
    if (e.target.value.trim()) {
      this.addTodo({
        id: uuid(),
        value: e.target.value,
        status: 'todo'
      });
    }
    this.setState({
      value: ''
    });
  }

  onCheckAllChange (e) {
    const todoList = this.state.todoList.map((todoItem) => {
      const item = Object.assign({}, todoItem);
      item.status = e.target.checked ? 'finished' : 'todo';
      return item;
    });
    this.setState({
      todoList,
      indeterminate: false,
      checkAll: e.target.checked,
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  componentWillMount () {
    if (JSON.parse(localStorage.getItem('todoList') || '[]').length === 0) {
      localStorage.setItem(name, '');
    }
  }

  render () {
    const { value, todoList, indeterminate, checkAll, statusChoice } = this.state;
    const leftItemList = todoList.filter((todoItem) => todoItem.status  === 'todo');
    return (
      <div className="todo-contaienr">
        <Input 
          value={value}
          size="large"
          placeholder="What needs to be done?" 
          prefix={
            <Checkbox
              checked={checkAll}
              indeterminate={indeterminate}
              onChange={this.onCheckAllChange}/>
          }
          onChange={this.onChange}
          onPressEnter={this.onPressEnter}/>
        <TodoList statusChoice={statusChoice} todoList={todoList} onStatusChange={this.onStatusChange} onRemoveItem={this.onRemoveItem} />
        <Footer leftNumber={leftItemList.length} onStatusChoiceChange={this.onStatusChoiceChange} clearCompleted={this.clearCompleted} />
      </div>
    );
  }
}

export default TodoContaienr;