import axios from 'axios';
import memoize from 'memoizee';

const getBaseUrl = () => {
    const windowUrl = window.location;
    const port = windowUrl.port.length > 0 ? `:${windowUrl.port}` : '';
    const hostname = windowUrl.pathname === '/' ? windowUrl.hostname : `${windowUrl.hostname}${windowUrl.pathname}`;
    const url = `${windowUrl.protocol}//${hostname}${port}`;
    return url;
}

const getComposersApi = () => {
    return axios.get(`${getBaseUrl()}/composers`);
};

const getComposerApi = (id) => {
    return axios.get(`${getBaseUrl()}/composers/${id}`);
};

const oneMinuteCache = 60000;

const getComposers = memoize(getComposersApi, { promise: true, maxAge: oneMinuteCache });
const getComposer = memoize(getComposerApi, { promise: true, maxAge: oneMinuteCache });

export { getComposers, getComposer };