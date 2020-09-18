import axios from './https';

const getSettings = async () => {
    const settings = await axios.get('/settings');
    return settings;
}

export {getSettings}