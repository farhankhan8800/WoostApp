import { SIGNEDIN, LOGGEDOUT } from '../actionTypes';

const defaultState = {
    userToken: '',
    userInfo: '',
};

function userReducer(state = defaultState, { type, userToken = '', userInfo = ''}) {
    switch (type) {
        case SIGNEDIN:
            return {
                ...state,
                userToken,
                userInfo,
            };
        case LOGGEDOUT:
            return {
                ...defaultState,
            };
        default:
            return defaultState;
    }
}

export default userReducer;
