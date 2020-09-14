import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />
    </Switch>
  );
};

export default Routes;
