import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

const Actions = {
  addTodo (text) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.ADD_TODO,
      text
    });
  },
  deleteTodo (index) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_TODO,
      index
    });
  },
  deleteCompletedTodos () {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_COMPLETED_TODOS
    });
  },
  toggleAllTodos (checked) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.TOGGLE_ALL_TODOS,
      checked
    });
  },
  toggleTodo (index) {
    TodoDispatcher.dispatch({
      type:  TodoActionTypes.TOGGLE_TODO,
      index
    });
  }
};

export default Actions;