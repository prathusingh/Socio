import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

const Signup = ({ errors, touched, serverErrors }) => {
  return (
    <Form>
      {serverErrors.error && <p>{serverErrors.error}</p>}
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field name="name" type="text" placeholder="Full Name" />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field name="email" type="email" placeholder="Email" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field name="password" type="password" placeholder="Password" />
      {touched.repassword && errors.repassword && <p>{errors.repassword}</p>}
      <Field name="repassword" type="password" placeholder="Reenter Password" />
      <button type="Submit" name="Signup">
        Signup
      </button>
    </Form>
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
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Did you forget to enter name'),
    email: Yup.string()
      .email()
      .required('Did you forget to enter email'),
    password: Yup.string()
      .min(8, 'Please enter password greater than 8 characters')
      .required('Did you forget to enter password'),
    repassword: Yup.string()
  }),
  handleSubmit: (values, { props }) => {
    const signingUser = {
      name: values.name,
      email: values.email,
      password: values.password
    };
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
  errors: PropTypes.object.isRequired
};

export const SignupForm = connect(mapStateToProps)(withRouter(formikEnhancer));
