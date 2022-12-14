
import {API_ENDPOINT_GET_SESSION} from "../api/endpoints";
import {TherapySession} from "../../store/session/session.types";

export const saveSessionData = (
    therapySession : TherapySession
) => {
    return saveSessionRequest(therapySession);
};

export const getSession = (
    deviceId : string,
    userId : string,
) => {
    return getSessionRequest({
        deviceId,
        userId,
    });
};

export const updateSession = (
    deviceId : string,
    userId : string,
    elapseTime : number
) => {
    return updateSessionRequest({
        deviceId,
        userId,
        elapseTime
    });
};

export const saveSessionRequest = (therapySession : TherapySession) => {
    const authEndpoint = API_ENDPOINT_GET_SESSION;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');


    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(therapySession),
    };
    console.log(JSON.stringify(therapySession))
    return fetch(authEndpoint, requestOptions);
};

export const getSessionRequest = (body: {deviceId: string, userId : string}) => {
    const authEndpoint = API_ENDPOINT_GET_SESSION;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let data  = {
        deviceId : body.deviceId,
        userId : body.userId
    }
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    };
    console.log(JSON.stringify(body))
    return fetch(authEndpoint, requestOptions);
};

export const updateSessionRequest = (body: {deviceId: string, userId : string, elapseTime : number}) => {
    const authEndpoint = API_ENDPOINT_GET_SESSION;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let data  = {
        deviceId : body.deviceId,
        userId : body.userId,
        elapseTime : body.elapseTime
    }
    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
    };
    console.log(JSON.stringify(body))
    return fetch(authEndpoint, requestOptions);
};
