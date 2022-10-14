import {ACCESS_TOKEN, REFRESH_TOKEN, USERID} from "../storage/storage";
// import {
//     selectAuthParams as authParamSelector,
// } from '../../store/storage/storage.selectors';
import {store} from '../../store/store';
import {BASE_URL} from "./endpoints";
import DeviceInfo from "react-native-device-info";
import base64 from 'react-native-base64'

export interface AuthParams {
    [ACCESS_TOKEN]: NullableString;
    [REFRESH_TOKEN]: NullableString;
    [USERID] : NullableString
}

export interface APIResponse {
    data: any,
    isTokenUpdated : boolean,
    token: string
}
import {useDispatch, useSelector} from "react-redux";
import {put} from "redux-saga/effects";
import {setItem} from "../../store/storage/storage.actions";
import {AuthenticationError} from "./errors";

export type NullableString = string | null;


export async function apiGetCallWithAuth(endpoint: string, requiredRawResponse?: boolean) : Promise<APIResponse>{
    console.log("function is called")
    const authParams: AuthParams = {
        [ACCESS_TOKEN] : store.getState().storage[ACCESS_TOKEN],
        [REFRESH_TOKEN] : store.getState().storage[REFRESH_TOKEN],
        [USERID] : store.getState().storage[USERID],
    }
    let deviceId  = await DeviceInfo.getUniqueId()
    if (authParams.accessToken !== null) {
        const headers = new Headers();
        headers.append('Authorization', `${authParams.accessToken}`);
        headers.append('device-id', base64.encode(deviceId));
        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        const url = BASE_URL + "/" + endpoint;
        console.log(url)
        let response: Response =  await fetch(url, requestOptions);
        let res =  await  response.json()
        console.log(authParams[USERID])
        console.log(authParams[REFRESH_TOKEN])
        console.log(authParams[ACCESS_TOKEN])
        if(res.status.code > 400){ // error occurred in the request
            if(res.status.code === 440 && res.status.message === 'jwt expired') {
                // token refresh and send the request again
                console.log("jwt expired")
                const refreshHeaders = new Headers();
                refreshHeaders.append('Authorization', `${authParams.accessToken}`);
                refreshHeaders.append('device-id', base64.encode(deviceId));
                refreshHeaders.append('user-id', base64.encode(authParams[USERID]));
                refreshHeaders.append('Content-Type', 'application/json');
                refreshHeaders.append('Accept', 'application/json');
                const refreshRequestOptions = {
                    method: 'POST',
                    headers: refreshHeaders,
                    body:  JSON.stringify({
                        refreshToken : authParams[REFRESH_TOKEN]
                    }),
                };
                const refreshUrl = BASE_URL + "/users/refreshToken" ;
                let refreshData : Response = await fetch(refreshUrl, refreshRequestOptions);
                let refreshJson =  await  refreshData.json()
                console.log(refreshJson)
                let newToken = refreshJson.payload.token

                if(refreshJson.status.code == 200 && newToken){
                    // resend the request with new api data
                    const newheaders = new Headers();
                    newheaders.append('Authorization', `${newToken}`);
                    newheaders.append('device-id', base64.encode(deviceId));
                    const newRequestOptions = {
                        method: 'GET',
                        headers: newheaders,
                    };
                    let newResponse: Response =  await fetch(url, newRequestOptions);
                    let newRes =  await  newResponse.json()
                    console.log(newRes)
                    // update the token
                    // dispatch(setItem(ACCESS_TOKEN,newToken))
                    // console.log(newRes)
                    return ({isTokenUpdated : true, data :newRes, token: newToken})
                } else {
                    // throw custom error
                    throw new Error('Session is expired');
                }

                } else {
                throw new Error('Error occurred while getting data.');
            }
        } else {
            console.log("returned val")
            return ({isTokenUpdated : false, data :res,token : ""})
        }


        // const response: Response = yield call(fetch, url, requestOptions);

        // if (requiredRawResponse === true) {
        //     return response;
        // }
        // const data = yield call([response, response.json]);
        // data.getResponse = () => {
        //     return response;
        // };
        // return response;
    } else {
        throw new Error("Couldn't call with empty instanceUrl or accessToken.");
    }

}

// export function apiPostCallWithAuth(endpoint: string, body: object) {
//     const authParams: AuthParams = yield selectAuthParams();
//
//     if (authParams.accessToken !== null && authParams.instanceUrl !== null) {
//         const headers = new Headers();
//         headers.append('Authorization', `Bearer ${authParams.accessToken}`);
//         headers.append('Content-Type', 'application/json');
//         headers.append('Accept', 'application/json');
//
//         const bodyKeys = Object.keys(body);
//
//         const requestOptions = {
//             method: 'POST',
//             headers: headers,
//             body: bodyKeys.length === 0 ? undefined : JSON.stringify(body),
//         };
//         const url = authParams.instanceUrl + endpoint;
//
//         const response: Response = yield call(fetch, url, requestOptions);
//         const data = yield call([response, response.json]);
//         data.getResponse = () => {
//             return response;
//         };
//         return data;
//     }
//     throw new Error("Couldn't call with empty instanceUrl or accessToken.");
// }
// export const selectAuthParams = () => {
//     return select(authParamSelector);
// };
