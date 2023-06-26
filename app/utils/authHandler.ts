import { cookies } from 'next/headers'

const axios = require('axios');

const tokenCookieKey = 'login_token';
const requestDomain = 'localhost:8080';

const cookieStore = cookies()

export class authHandler {

  async hasAuthTokenInCookies(): Promise<boolean> {
    return await cookieStore.has(tokenCookieKey);
  }

  async validateTokenInCookies() {
    const hasAuthTokenInCookies = await this.hasAuthTokenInCookies();
    if (!hasAuthTokenInCookies) {
      return;
    }

    const tokenCookie = cookieStore.get(tokenCookieKey);
    return await axios.get(
      requestDomain + '/login/authKeyIsValid',
      {
        params: {
          token: tokenCookie,
        },
      }
    );
  }

  async saveTokenInCookies(token: string) {
    // validate token first...
    cookieStore.set(tokenCookieKey, token);
  }

}
