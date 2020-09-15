import axios from './https';

const getAllRedirects = async () => {
    const redirects = await axios.get('/redirects');
    return redirects;
}

const getOneRedirect = async (id: string) => {
    const redirect = await axios.get(`/redirect/${id}`);
    return redirect;
}

const deleteOneRedirect = async (id: string) => {
    await axios.get(`/redirect/${id}`);
}

const updateOneRedirect = async (id: string, redirect: string) => {
    await axios.post(`/redirect/${id}`, {
        redirect: redirect
    });
}

const createOneRedirect = async (redirect: string) => {
    await axios.post(`/redirect`, {
        redirect: redirect
    });
}


export {getAllRedirects, getOneRedirect, deleteOneRedirect, updateOneRedirect, createOneRedirect}