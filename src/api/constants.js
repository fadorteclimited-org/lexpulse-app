const APIBASE = `https://api-staging.lexpulse.app/`;
// const APIBASE = `http://127.0.0.1:4500/`;

export const ENDPOINTS = {
    signup: `${APIBASE}api/v1/users`,
    login: `${APIBASE}api/v1/auth`,
    events: `${APIBASE}api/v1/events`,
    favorites: `${APIBASE}api/v1/favorites`,
    tickets: `${APIBASE}api/v1/tickets`,
    following: `${APIBASE}api/v1/following`,
    notifications: `${APIBASE}api/v1/notifications`,
};