class Auth {
  constructor() {
    this.authenticated = false;
  }

  authenticationApproval(callBack) {
    this.authenticated = true;
    callBack();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
