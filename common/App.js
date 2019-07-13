import React from 'react';

import TodoContaienr from './TodoContaienr';

class App extends React.Component {

  render () {
    return (
      <div className="container">
        <header className="header">
          <h1>Todos</h1>
        </header>
        <TodoContaienr />
      </div>
    );
  }
}

export default App;