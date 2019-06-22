import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';
import { Spinner } from '../spinner/Spinner';
import './Signup.scss';

const Signup = ({ errors, status, touched, serverErrors }) => {
  return (
    <div className="signup-form">
      <section>
        <h1>Socio</h1>
        <p>Embrace your life where you live after work !</p>
        <Form>
          <div className="credentials">
            {serverErrors.error && (
              <p className="error">{serverErrors.error}</p>
            )}
            <div>
              <Field name="name" type="text" placeholder="Full Name" />
              {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
              )}
            </div>
            <div>
              <Field name="email" type="email" placeholder="Email" />
              {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" />
              {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>
            <div>
              <Field
                name="repassword"
                type="password"
                placeholder="Reenter Password"
              />
              {touched.repassword && errors.repassword && (
                <p className="error">{errors.repassword}</p>
              )}
            </div>
            <button type="Submit" name="Signup" className="wide-btn auth-btn">
              Signup
              {status.isClicked && !serverErrors.error ? <Spinner /> : null}
            </button>
          </div>
        </Form>
      </section>
    </div>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues() {
    return {
      name: '',
      email: '',
      password: '',
      repassword: ''
    };
  },
  mapPropsToStatus() {
    return {
      isClicked: false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Did you forget to enter name'),
    email: Yup.string()
      .email()
      .required('Did you forget to enter email'),
    password: Yup.string()
      .min(8, 'Please enter password greater than 8 characters')
      .required('Did you forget to enter password'),
    repassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password does not match')
      .required('Please reenter password')
  }),
  handleSubmit: (values, { props, setStatus }) => {
    const signingUser = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    setStatus({ isClicked: true });

    props.dispatch(registerUser(signingUser, props.history));
  }
})(Signup);

const mapStateToProps = state => {
  return {
    auth: state.auth,
    serverErrors: state.errors
  };
};

Signup.propTypes = {
  auth: PropTypes.object.isRequired,
  serverErrors: PropTypes.object.isRequired
};

export const SignupForm = connect(mapStateToProps)(withRouter(formikEnhancer));
