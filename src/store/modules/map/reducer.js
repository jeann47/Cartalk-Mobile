import produce from 'immer';

const INITIAL_STATE = {
    near: [],
    distance: {},
    routes: '',
};

export default function map(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@map/GET': {
                draft.near = action.payload.near;
                draft.distance = action.payload.distance;
                draft.routes = action.payload.routes;
                break;
            }
            case '@map/GOT': {
                draft.near = action.payload.near;
                break;
            }
            default:
        }
    });
}
