import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

//import { validateResetPasswordToken } from '../../actions/authActions';

const ResetPassword = ({ errors, touched, serverErrors }) => {
  return (
    <Form className="Reset-password">
      {serverErrors.error && <p>{serverErrors.error}</p>}
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field name="password" type="password" placeholder="Password" />
      {touched.repassword && errors.repassword && <p>{errors.repassword}</p>}
      <Field name="repassword" type="password" placeholder="Reenter Password" />
      <button type="submit" name="reset">
        Update
      </button>
    </Form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues() {
    return {
      password: '',
      repassword: ''
    };
  },
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, 'Please enter password greater than 8 characters')
      .required('Did you forget to enter password'),
    repassword: Yup.string()
  }),
  handleSubmit(values, { props }) {
    const password = values.password;
    console.log(password);
    //props.dispatch(resetPassword(password));
  }
})(ResetPassword);

const mapStateToProps = state => {
  return {
    serverErrors: state.errors
  };
};

ResetPassword.propTypes = {
  serverErrors: PropTypes.object.isRequired
};

export const ResetPasswordForm = connect(mapStateToProps)(formikEnhancer);
