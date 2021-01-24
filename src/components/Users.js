import React from "react";
import NewUser from "./NewUser.js"

class Users extends React.Component {

  /**
   * List users that had the animal required, sorted by points and limited to 10 or 25 as required
   */
  _list = () => {
    let { animal, limit } = this.props;
    let users = JSON.parse(window.sessionStorage.getItem('users'))

    users = users.filter(user => (user.animals.indexOf(animal) >= 0 && user.isActive));
    users = users.sort((a, b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0));

    let usersFiltered = [];
    for (let i = 0; i < this.props.limit; i++) {
      if (typeof users[i] === 'undefined') break
      usersFiltered.push(users[i]);
    }

    return <div className="list">{usersFiltered.map(user => <details key={user.id}>
      <summary>{user.name.given} {user.name.surname} (age {user.age}) <strong>{user.points} points</strong></summary>
      {user.animals.map((animal) => <button key={user.id + '-' + animal + '-' + Math.round(Math.random() * 1000)} onClick={() => { this.props.clickHandler('users', animal, 10); }}>{animal}</button>)}
      <button className="danger" onClick={() => this.remove(user.id)}>Remove user</button>
    </details>
    )}
      {limit === 10 && <p><button onClick={() => { this.props.clickHandler('users', animal, 25); }}>Show more</button></p>}</div>;
  }
  get list() {
    return this._list;
  }
  set list(value) {
    this._list = value;
  }

  /**
   * Remove a user from the users list
   * @param {string} id ID of the user to be removed
   */
  _remove = (id) => {
    let users = JSON.parse(window.sessionStorage.getItem('users'));
    users = users.filter(user => user.id !== id);
    window.sessionStorage.setItem('users', JSON.stringify(users));
    this.props.clickHandler('users', this.props.animal, this.props.limit)
  };
  get remove() {
    return this._remove;
  }
  set remove(value) {
    this._remove = value;
  }

  render() {
    if (this.props.editUser === 'new') {
      return (
        <NewUser clickHandler={this.props.clickHandler}/>
      )
    } else {
      return (
        this.list()
      )
    }
  }
}

export default Users;