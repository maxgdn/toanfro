import axios from './https';

const getAllVisitors = async () => {
    const visitors = await axios.get('/visitors');
    return visitors;
}


export {getAllVisitors};