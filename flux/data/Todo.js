import Immutable from 'immutable';

const Todo = Immutable.Record({
  id: '',
  value: '',
  status: 'todo'
});

export default Todo;