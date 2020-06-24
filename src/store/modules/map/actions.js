export function getUsers(near, distance, routes) {
    return {
        type: '@map/GET',
        payload: { near, distance, routes },
    };
}

export function gotUsers(near) {
    return {
        type: '@map/GOT',
        payload: { near },
    };
}
