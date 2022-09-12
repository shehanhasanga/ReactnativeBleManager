

import {API_ENDPOINT_AUTH_ISSUE_TOKEN, API_SAVE_USER_DATA, API_GET_USERIMPORTANT_THINGS} from './endpoints';
import {GET_COMMON_PHYSICAL_ACTIVITIES, GET_USER_IMPORTANT_THINGS} from "../../store/userData/userdata.types";

export const PUBLIC_MOBILE_CLIENT_ID = 'orangehrm_mobile_app';
export const PUBLIC_MOBILE_CLIENT_SECRET = '';
export const REQUIRED_SCOPE = 'user';
export const GRANT_TYPE_PASSWORD = 'password';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

export const authenticate = (
  username: string,
  password: string,
) => {
  return authRequest({
    username,
    password,
  });
};

export const getNewAccessToken = (
  refreshToken: string,
) => {
  return authRequest( {
    grant_type: GRANT_TYPE_REFRESH_TOKEN,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
    refresh_token: refreshToken,
  });
};

export const checkLegacyInstance = () => {
  return authRequest( {
    grant_type: GRANT_TYPE_PASSWORD,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
  });
};

export const authRequest = (body: object) => {
  const authEndpoint = API_ENDPOINT_AUTH_ISSUE_TOKEN;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let data  = {
    userName : body.username,
    password : body.password
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  };
  console.log(JSON.stringify(body))
  return fetch(authEndpoint, requestOptions);
};

export const saveUserDataRequest = (body: object) => {
  const endpoint = API_SAVE_USER_DATA;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  };
  return fetch(endpoint, requestOptions);
};

export const getCommonPhysicalActivities = (body: object) => {
  const endpoint = GET_COMMON_PHYSICAL_ACTIVITIES;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: headers
  };
  return fetch(endpoint, requestOptions);
};


export const getUserImportantThings = (body: object) => {
  const endpoint = API_GET_USERIMPORTANT_THINGS;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: headers
  };
  return fetch(endpoint, requestOptions);
};
