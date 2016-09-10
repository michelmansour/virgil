import $ from 'jquery';

function performLogin(username, password, cb) {
  $.ajax({
    url: '/login',
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ username, password }),
    success: (data) => {
      cb({ authenticated: true, token: data.token });
    },
    error: (xhr, status, err) => {
      console.error('/login', status, err.toString());
      cb({ authenticated: false, token: null });
    },
  });
}

function onChange() {}

function login(email, pass, cb) {
  if (sessionStorage.token) {
    if (cb) cb(true);
    onChange(true);
    return;
  }
  performLogin(email, pass, (res) => {
    if (res.authenticated) {
      sessionStorage.token = res.token;
      if (cb) cb(true);
      onChange(true);
    } else {
      if (cb) cb(false);
      onChange(false);
    }
  });
}

function logout(cb) {
  delete sessionStorage.token;
  if (cb) cb();
  onChange(false);
}

function loggedIn() {
  return !!sessionStorage.token;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function requestWithAuth(ajaxConfig) {
  return $.ajax({
    headers: { Authorization: `Bearer ${sessionStorage.token}` },
    ...ajaxConfig,
  });
}

export { login, logout, loggedIn, requireAuth, requestWithAuth };
