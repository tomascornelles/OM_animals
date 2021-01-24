import React from "react";

class NewUser extends React.Component {

  /**
   * Get data from the user form for create a new user
   */
  _addForm = () => <form className="form" onSubmit={this.add}>
    <label htmlFor="name">Name</label>
    <input type="text" name="name" id="newuser-givenName" placeholder="Given name" />
    <input type="text" id="newuser-surname" placeholder="Surname" />
    <label htmlFor="age">Age</label>
    <input type="text" name="age" id="newuser-age" placeholder="Age" />
    <label htmlFor="points">Points</label>
    <input type="text" name="points" id="newuser-points" placeholder="Points" />
    <label htmlFor="animals">Animals <em>(One per line)</em></label>
    <textarea name="animals" id="newuser-animals"></textarea>
    <input type="submit" value="Add new user" />
  </form>;
  get addForm() {
    return this._addForm;
  }
  set addForm(value) {
    this._addForm = value;
  }

  /**
   * Function for generate a new id
   * @param {number} l Sets de length of the ID generated
   */
  _makeid = (l = 24) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < l; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  get makeid() {
    return this._makeid;
  }
  set makeid(value) {
    this._makeid = value;
  }

  /**
   * Add a new user to the users list getting data from the form.
   * @param {event} e event from the form
   */
  _add = (e) => {
    e.preventDefault()
    let users = JSON.parse(window.sessionStorage.getItem('users'));
    let animals = document.querySelector('#newuser-animals').value.split('\n')
    if (animals[0]) {
      users.push({
        "id": this.makeid(),
        "name": {
          "given": document.querySelector('#newuser-givenName').value,
          "surname": document.querySelector('#newuser-surname').value
        },
        "points": document.querySelector('#newuser-points').value,
        "animals": animals,
        "isActive": true,
        "age": document.querySelector('#newuser-age').value
      })
      window.sessionStorage.setItem('users', JSON.stringify(users));
      this.props.clickHandler('animals', this.props.animal, this.props.limit)
    }
  };
  get add() {
    return this._add;
  }
  set add(value) {
    this._add = value;
  }

  render() {
    return (
      this.addForm()
    )
  }
}

export default NewUser;