import React from 'react';
import './Profile.scss';

export class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <form>
          <h1>Update Profile</h1>
          <section>
            <p>
              <label for="name">
                <span>Name: </span>
              </label>
              <input type="text" id="name" name="fullname" />
            </p>
            <p>
              <label for="unit">
                <span>Unit#: </span>
              </label>
              <select id="baseUnit">
                <option value="670">670</option>
                <option value="674">674</option>
              </select>
              <input type="number" id="unit" name="unit#" />
            </p>
            <p>
              <label for="interests">
                <span>Interests: </span>
              </label>
              <input type="text" id="interests" name="interests" />
            </p>
            <ul id="interestSelected">
              <li>Singing</li>
              <li>Dancing</li>
              <li>Programming</li>
            </ul>
            <p>
              <label>Opt in Socio</label>
              <input type="checkbox" id="isSocio" />
            </p>
          </section>
        </form>
      </div>
    );
  }
}
