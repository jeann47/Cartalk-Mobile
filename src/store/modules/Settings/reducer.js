import produce from 'immer';

const INITIAL_STATE = {
    range: 100000,
    emergencyPhone: 190,
    route: '',
};

export default function settings(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@cfg/RANGE': {
                draft.range = Number(action.payload.range) * 1000;
                break;
            }
            case '@cfg/PHONE': {
                draft.emergencyPhone = action.payload.phone;
                break;
            }
            case '@cfg/ROUTE': {
                draft.route = action.payload.route;
                break;
            }
            default:
        }
    });
}
