import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';

import Todo from './Todo';
import { uuid } from '../../util';
import TodoDispatcher from './TodoDispatcher';
import TodoActionTypes from './TodoActionTypes';

class TodoStore extends ReduceStore {
  constructor () {
    super(TodoDispatcher);
  }

  getInitialState () {
    const storageList = JSON.parse(window.localStorage.getItem('todoList') || '[]');
    const todoList = storageList.map(item => {
      return new Todo({
        id: item.id,
        value: item.value,
        status: item.status
      });
    });
    return Immutable.List(todoList);
  }

  reduce (state, action) {
    let todoList;
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        if (!action.text) {
          todoList = state;
        }
        todoList = state.push(new Todo({
          id: uuid(),
          value: action.text
        }));
        break;
      case TodoActionTypes.DELETE_COMPLETED_TODOS:
        todoList = state.filter((todoItem) => todoItem.status === 'todo');
        break;
      case TodoActionTypes.DELETE_TODO:
        todoList = state.splice(action.index, 1);
        break;
      case TodoActionTypes.TOGGLE_ALL_TODOS:
        todoList = state.map(todo => todo.set('status', action.checked ? 'finished' : 'todo'));
        break;
      case TodoActionTypes.TOGGLE_TODO:        
        todoList = state.set(
          action.index, 
          state.get(action.index).set('status', state.get(action.index).status === 'todo' ? 'finished' : 'todo')
        );
        break;
      default:
        todoList = state;
        break;
    }
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
    return todoList;
  }
}

export default new TodoStore();