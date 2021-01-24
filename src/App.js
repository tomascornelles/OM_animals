import React from "react";
import Animals from "./components/Animals.js";
import Users from "./components/Users.js";

import './App.css';

let users = (window.sessionStorage.getItem('users'))
  ? JSON.parse(window.sessionStorage.getItem('users'))
  : require('./users.json');

window.sessionStorage.setItem('users', JSON.stringify(users))

class App extends React.Component {

  state = {
    page: 'animals',
    animal: '',
    limit: 10
  }

  /**
   * Sets de state of the app.
   * @param {string} p page to be rendered
   * @param {string} a animal to list if the page is animal
   * @param {number} l limit of the users list
   */
  setPage = (p, a = this.state.animal, l = this.state.limit) => {
    this.setState({ page: p, animal: a, limit: l })
  }

  render() {
    return (
      <div>
        <header>
          {this.state.page === 'animals' && <h1>Animal Lovers</h1>}
          {this.state.page === 'users' &&
            <div>
              <h1>{this.state.animal} Lovers</h1>
              <button onClick={() => { this.setPage('animals', '') }}>⇠ List of animals</button>
            </div>
          }
          {this.state.page === 'newUser' &&
            <div>
              <h1>New Animal Lover</h1>
              <button onClick={() => { this.setPage('animals', '') }}>⇠ List of animals</button>
            </div>
          }
        </header>
        <main>
          {this.state.page === 'animals' && <Animals clickHandler={this.setPage} />}
          {this.state.page === 'users' && <Users animal={this.state.animal} users={users} limit={this.state.limit} clickHandler={this.setPage} />}
          {this.state.page === 'newUser' && <Users animal={this.state.animal} users={users} limit={this.state.limit} editUser="new" clickHandler={this.setPage} />}
        </main>
        <footer>
          {this.state.page !== 'newUser' && <button onClick={() => this.setPage('newUser')}>Add user</button>}
        </footer>
      </div>

    );
  }
}

export default App;
