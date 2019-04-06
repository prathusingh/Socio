import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../../actions/authActions';

const LandingLogin = ({ values, errors, touched, serverErrors }) => {
  return (
    <Form className="Login">
      {serverErrors.error && <p>{serverErrors.error}</p>}
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field name="email" type="email" placeholder="Email" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field name="password" type="password" placeholder="Password" />
      <button type="submit" name="login">
        Log in
      </button>
    </Form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: ''
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
  handleSubmit(values, { props }) {
    const loggingUser = {
      email: values.email,
      password: values.password
    };
    props.dispatch(loginUser(loggingUser, props.history));
  }
})(LandingLogin);

const mapStateToProps = state => {
  return {
    serverErrors: state.errors
  };
};

LandingLogin.propTypes = {
  serverErrors: PropTypes.object.isRequired
};

export const LandingLoginForm = connect(mapStateToProps)(
  withRouter(formikEnhancer)
);
