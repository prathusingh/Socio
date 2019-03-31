import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { validateResetPasswordToken } from '../../actions/authActions';
import { updatePassword } from '../../actions/authActions';

class ResetPassword extends React.Component {
  token = '';

  componentDidMount() {
    this.props.dispatch(
      validateResetPasswordToken(this.props.match.params.token)
    );
  }

  render() {
    return (
      <Form>
        {this.props.serverErrors.error && (
          <p>{this.props.serverErrors.error}</p>
        )}
        {this.props.touched.password && this.props.errors.password && (
          <p>{this.props.errors.password}</p>
        )}
        <Field name="password" type="password" placeholder="Password" />
        {this.props.touched.repassword && this.props.errors.repassword && (
          <p>{this.props.errors.repassword}</p>
        )}
        <Field
          name="repassword"
          type="password"
          placeholder="Reenter Password"
        />
        <button type="submit" name="reset">
          Update
        </button>
      </Form>
    );
  }
}

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
    props.dispatch(
      updatePassword(
        {
          password: values.password,
          resetPasswordToken: props.match.params.token
        },
        props.history
      )
    );
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
