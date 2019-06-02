import React from 'react';
import './Profile.scss';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
    };
  }
  render() {
    return (
      <div className="profile">
        <Form>
          <h1>Update Profile</h1>
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
              <input type="text" id="interests" name="interests" />
              <span>Press Enter to add</span>
            </p>
            <ul id="interestSelected">
              {this.state.interests.forEach((interest, index) => {
                <li key={index}>
                  <span>{interest}</span>
                </li>;
              })}
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
