import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { forgotPassword } from '../../actions/authActions';

const ForgotPassword = ({ errors, touched, serverErrors, auth }) => {
  return (
    <Form className="Forgot-password">
      {serverErrors.error && <p>{serverErrors.error}</p>}
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field name="email" type="email" placeholder="Email" />
      <button type="submit" name="reset">
        Reset it
      </button>
      {auth.systemMessage && <p>{auth.systemMessage}</p>}
    </Form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues() {
    return {
      email: ''
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Please enter valid email')
  }),
  handleSubmit(email, { props }) {
    props.dispatch(forgotPassword(email));
  }
})(ForgotPassword);

const mapStateToProps = state => {
  return {
    serverErrors: state.errors,
    auth: state.auth
  };
};

ForgotPassword.propTypes = {
  serverErrors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export const ForgotPasswordForm = connect(mapStateToProps)(formikEnhancer);
