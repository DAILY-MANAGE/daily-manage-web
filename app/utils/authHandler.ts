import { NextRequest } from 'next/server';
const axios = require('axios');

const tokenCookieKey = 'login_token';
const requestDomain = 'localhost://';

export class authHandler {
  request: NextRequest;

  constructor(request: NextRequest) {
    this.request = request;
  }

  async hasAuthTokenInCookies() {
    let hasAuthToken = false;

    if (!this.request.cookies.has(tokenCookieKey)) {
      return false;
    }

    let tokenCookie = this.request.cookies.get(tokenCookieKey);
    try {
      const response = await axios.get(
        requestDomain + '/login/authKeyIsValid',
        {
          params: {
            token: tokenCookie,
          },
        });
      return response.code == 200;
    } catch (error) {
      console.error(error);
    }

    return false;
  }
}
