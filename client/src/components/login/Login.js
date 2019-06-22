import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';
import { Spinner } from '../spinner/Spinner';
import './Login.scss';

const Login = ({ values, status, errors, touched, serverErrors }) => {
  return (
    <div className="login-form">
      <section>
        <h1>Socio</h1>
        <p>Welcome back</p>
        <Form>
          <div className="credentials">
            {serverErrors.error && <p>{serverErrors.error}</p>}
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
            <button type="submit" name="login" className="wide-btn auth-btn">
              Log in
              {status.isClicked ? <Spinner /> : null}
            </button>
            <Link to="/forgotpassword">
              <span>Forgot password?</span>
            </Link>
          </div>
        </Form>
      </section>
    </div>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: ''
    };
  },
  mapPropsToStatus() {
    return {
      isClicked: false
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Did you forget to enter email'),
    password: Yup.string()
      .min(8, 'Please enter password greater than 8 characters')
      .required('Did you forget to enter password')
  }),
  handleSubmit(values, { props, setStatus }) {
    const loggingUser = {
      email: values.email,
      password: values.password
    };

    setStatus({ isClicked: true });

    props.dispatch(loginUser(loggingUser, props.history));
  }
})(Login);

const mapStateToProps = state => {
  return {
    serverErrors: state.errors
  };
};

Login.propTypes = {
  serverErrors: PropTypes.object.isRequired
};

export const LoginForm = connect(mapStateToProps)(withRouter(formikEnhancer));
