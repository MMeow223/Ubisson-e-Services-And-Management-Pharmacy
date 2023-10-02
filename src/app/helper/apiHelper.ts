import { environment } from "src/environments/environment";
import { CapacitorHttp } from '@capacitor/core';

// Helper function to get a cookie value by name
function getCookie(name: string) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop()?.split(";").shift() || "";
    return "";
}

async function csrfFetch() {
    return await CapacitorHttp.request({
        method: 'get',
        url: `${environment.apiDomain}/sanctum/csrf-cookie`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        webFetchExtra: { credentials: 'include' },
    });
}

export const loginHelper = async (organizationId: string, username: string, password: string) => {
    try {
        if (localStorage.getItem('token') != null) {
            return;
        }

        await csrfFetch();

        // Make the login request with the xsrf cookie attached
        let response = await CapacitorHttp.request({
            method: 'post',
            url: `${environment.apiDomain}/v1/pharmacist/login`,
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                'Content-Type': 'application/json'
            },
            data: {
                organizationId: organizationId,
                username: username,
                password: password
            },
            webFetchExtra: { credentials: 'include' }
        });

        // If the login was successful, store the token in local storage
        if (response.status == 200) {
            localStorage.setItem('token', response.data.token);
        }
    } catch (error) {
        console.error(error);
    }
}

export const forgotPasswordHelper = async (email: string) => {
    try {
        await csrfFetch();

        let result = await CapacitorHttp.request({
            method: 'POST',
            url: `${environment.apiDomain}/v1/pharmacist/forgot`,
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                'Content-Type': 'application/json'
            },
            data: {
                email: email
            },
            webFetchExtra: { credentials: 'include' }
        });

        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchWithCSRF = async (path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", data: object = {}) => {
    try {
        await csrfFetch();

        let result = await CapacitorHttp.request({
            method: method,
            url: `${environment.apiDomain}/${path}`,
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                'Content-Type': 'application/json'
            },
            data: data,
            webFetchExtra: { credentials: 'include' }
        });

        return result.data;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const authorisedFetch = async (path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", data: object = {}) => {
    if (localStorage.getItem('token') == null) {
        return null;
    }

    console.log("authorisedFetch", path, method, data);

    try {
        await csrfFetch();

        let httpOptions: any = {
            method: method,
            url: `${environment.apiDomain}/${path}`,
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            webFetchExtra: { credentials: 'include' }
        }

        if (method != "GET") {
            httpOptions.data = data;
        }

        let result = await CapacitorHttp.request(httpOptions);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }

    return null;
}