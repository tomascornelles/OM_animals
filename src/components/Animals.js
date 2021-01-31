import React from "react";

class Animals extends React.Component {

  /**
   * List all animals from avaiable users, sorted alphabeticaly
   */
  _list = () => {
    let animals = []
    let users = JSON.parse(window.sessionStorage.getItem('users'))
    users.forEach(user => {
      if (user.isActive) {
        user.animals.forEach(animal => {
          if (animals.indexOf(animal) < 0) {
            animals.push(animal);
          }
        });
      }
    });
    animals.sort((a, b) => (a.toLowerCase() > b.toLowerCase()) ? 1 : ((b.toLowerCase() > a.toLowerCase()) ? -1 : 0));
    return <section className="list">{animals.map((animal) => <button key={animal} onClick={() => { this.props.clickHandler('users', animal, 10); }}>{animal}</button>
    )}</section>;
  };
  get list() {
    return this._list;
  }
  set list(value) {
    this._list = value;
  }
  render() {
    return (
      this.list()
    )
  }
}

export default Animals;