import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Login = ({ values, errors, touched }) => {
  return (
    <Form className="Login">
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field name="email" type="email" placeholder="Email" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field name="password" type="password" placeholder="Password" />
      <button type="submit" name="login">
        Log in
      </button>
      <section className="Login-extras">
        <label>
          <Field
            type="checkbox"
            name="remember"
            id="rememberMe"
            checked={values.remember}
          />
          Remember me
        </label>
        <span>.</span>
        <a href="/">Forgot passowrd?</a>
      </section>
    </Form>
  );
};

export const LoginForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
      remember: true
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Did you forget to add email'),
    password: Yup.string()
      .min(8, 'Please enter password greater than 8 characters')
      .required('Did you forget to add password')
  }),
  handleSubmit(values) {
    const loggingUser = {
      email: values.email,
      password: values.password
    };
    //console.log(JSON.stringify(loggingUser));
    axios
      .post('http://localhost:8000/api/users/login', loggingUser)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
})(Login);
