import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from 'axios';
import * as Bowser from "bowser"; 
import * as Fingerprint2 from 'fingerprintjs2';

let axiosInstance = axios.create({
    baseURL: window.location.origin,
    timeout: 10000,
  });

const bowserGrab = async () => {
    let system = await Bowser.parse(window.navigator.userAgent);
    return system;
}

const fingerGrab = async () => {
    let components = {};
    //@ts-ignore
    if (window.requestIdleCallback) {
        return await new Promise((resolve) => {
            //@ts-ignore
            requestIdleCallback(async () => {
            components = await Fingerprint2.getPromise();
            resolve(components);
        }, (callback) => {
            
        })});

    } else {
        return await new Promise((resolve) => {setTimeout(async () => {
            components = await Fingerprint2.getPromise();
            console.log(components);
            resolve(components);
        }, 500)});
    }
}

const submit = async (d: CheckData) => {
    const result = await axiosInstance.post('/checkup', d);
}

const redirect = async (to: string) => {
    console.log(`Redirecting ${to}`);
    //window.location.assign(to);
}

interface CheckData {
    bowser: object,
    fingerprint: any,
    id: string,
}

let main = async () => {
    const to: string = await new Promise((resolve) => {
        let token = document.getElementById("to").className;
        resolve(token);
    });

    try {
        const system = await bowserGrab();
        const fingerprint = await fingerGrab();

        console.log(system)
        console.log(fingerprint)

        const uuid: string = await new Promise((resolve) => {
            let token = document.getElementById("control_token").className;
            resolve(token);
        });

        try {
            const res = await submit({bowser: system, fingerprint: fingerprint,id:uuid});
            console.log(res);
        } catch (error) {
            //log it
        } finally {
            //redirect
            redirect(to);
        }
    } finally {
        redirect(to);
    }
}

main();