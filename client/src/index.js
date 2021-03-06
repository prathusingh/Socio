import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import App from './App';
import { LoginForm } from './components/login/Login';
import { SignupForm } from './components/signup/Signup';
import Home from './components/home/Home';
import { ForgotPasswordForm } from './components/forgot-password/ForgotPassword';
import { ResetPasswordForm } from './components/forgot-password/ResetPassword';
import ProfileForm from './components/profile/Profile';
import requireAuth from './components/HOC/require-auth/RequireAuth';
import './styles/_base.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route path="/home" component={requireAuth(Home)} />
        <Route path="/forgotpassword" component={ForgotPasswordForm} />
        <Route
          exact
          path="/resetpassword/:token"
          component={ResetPasswordForm}
        />
        <Route exact path="/profile" component={requireAuth(ProfileForm)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
