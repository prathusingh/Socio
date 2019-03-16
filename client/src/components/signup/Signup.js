import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Signup = ({ errors, touched }) => {
  return (
    <Form>
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

export const SignupForm = withFormik({
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
  handleSubmit(values) {
    const signingUser = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    axios
      .post('http://localhost:8000/api/users/register', signingUser)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
})(Signup);
