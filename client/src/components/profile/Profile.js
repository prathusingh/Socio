import React from 'react';
import './Profile.scss';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { SessionManager } from '../session-manager/SessionManager';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
    };
  }

  updateInterests(event) {
    if (event.key === 'Enter') {
      const interests = this.state.interests.slice();
      interests.push(event.target.value);
      this.setState({ interests: interests });
    }
  }
  render() {
    return (
      <div className="profile">
        <Form>
          <h1>
            {this.props.auth.user.name}!, You are at the right place to update
            your profile
          </h1>
          <section>
            {this.props.touched.name && this.props.errors.name && (
              <p>{this.props.errors.name}</p>
            )}
            <label htmlFor="name">
              <span>Name: </span>
            </label>
            <Field name="name" type="text" placeholder="Full Name" />
            <p>
              <label htmlFor="unit">
                <span>Unit#: </span>
              </label>
              <select id="baseUnit">
                <option value="670">670</option>
                <option value="674">674</option>
              </select>
              <Field name="unit" type="number" />
            </p>
            <p>
              <label htmlFor="interests">
                <span>Interests: </span>
              </label>
              <input
                type="text"
                id="interests"
                name="interests"
                onKeyDown={this.updateInterests.bind(this)}
              />
              <span>Press Enter to add</span>
            </p>
            <ul id="interestSelected">
              {this.state.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
            <p>
              <label>Opt in Socio</label>
              <input type="checkbox" id="isSocio" />
            </p>
            <button type="submit">Update</button>
          </section>
        </Form>
      </div>
    );
  }
}

const ProfileForm = withFormik({
  mapPropsToValues() {
    return {
      name: '',
      unit: ''
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Did you forget to enter name')
  })
})(Profile);

export default ProfileForm;
