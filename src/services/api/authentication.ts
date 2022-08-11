

import {API_ENDPOINT_AUTH_ISSUE_TOKEN} from './endpoints';

export const PUBLIC_MOBILE_CLIENT_ID = 'orangehrm_mobile_app';
export const PUBLIC_MOBILE_CLIENT_SECRET = '';
export const REQUIRED_SCOPE = 'user';
export const GRANT_TYPE_PASSWORD = 'password';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

export const authenticate = (
  instanceUrl: string,
  username: string,
  password: string,
) => {
  return authRequest(instanceUrl, {
    grant_type: GRANT_TYPE_PASSWORD,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
    scope: REQUIRED_SCOPE,
    username,
    password,
  });
};

export const getNewAccessToken = (
  instanceUrl: string,
  refreshToken: string,
) => {
  return authRequest(instanceUrl, {
    grant_type: GRANT_TYPE_REFRESH_TOKEN,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
    refresh_token: refreshToken,
  });
};

export const checkLegacyInstance = (instanceUrl: string) => {
  return authRequest(instanceUrl, {
    grant_type: GRANT_TYPE_PASSWORD,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
  });
};

export const authRequest = (instanceUrl: string, body: object) => {
  const authEndpoint = instanceUrl + API_ENDPOINT_AUTH_ISSUE_TOKEN;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  };
  return fetch(authEndpoint, requestOptions);
};
