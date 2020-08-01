let backendHost;
let UIauth;
let uiOptionChain;
const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:3000/';
  UIauth = 'http://localhost/auth/';
  uiOptionChain = 'http://localhost/';
} else {
  backendHost = 'http://localhost:3000/';
  UIauth = 'http://localhost/auth/';
  uiOptionChain = 'http://localhost/';
}

export const api = {
  apiRoot: backendHost,
  uiAuth: UIauth,
  uiOptionChain: uiOptionChain
}