import React from 'react';
import { Link } from 'react-router';
import { logout } from './auth';

class Logout extends React.Component {
  componentDidMount = () => {
    logout();
  }

  render = () => (
    <div>
      <p>You have logged out.</p>
      <Link to="/login">Log in again</Link>
    </div>
  )
}

export default Logout;
