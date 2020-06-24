export function setRange(range) {
    return {
        type: '@cfg/RANGE',
        payload: { range },
    };
}

export function setEmergencialPhone(phone) {
    return {
        type: '@cfg/PHONE',
        payload: { phone },
    };
}

export function setRoute(route) {
    return {
        type: '@cfg/ROUTE',
        payload: { route },
    };
}
