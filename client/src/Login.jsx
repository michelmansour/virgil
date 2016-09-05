import React, { PropTypes } from 'react';
import { login } from './auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  handleUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    if (!username || !password) {
      return;
    }
    this.setState({ username: '', password: '' });

    login(username, password, (loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: true });
      } else {
        const { location } = this.props;
        if (location.state && location.state.nextPathname) {
          this.context.router.replace(location.state.nextPathname);
        } else {
          this.context.router.replace('/');
        }
      }
    });
  }

  render = () => (
    <form className="loginForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={this.state.username}
        onChange={this.handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}
      />
      <input type="submit" value="Begin" />
      {this.state.error && (
        <p className="error">Bad login!</p>
      )}
    </form>
  );
}

Login.propTypes = {
  location: PropTypes.object,
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Login;
