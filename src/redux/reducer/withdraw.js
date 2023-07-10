
const initialState = {
    withdrawInfo: {},
};

function withdrawReducer(state = initialState, { type, withdrawInfo }) {
    switch (type) {
        case 'WITHDRAW_DATA':
            return {
                ...state,
                withdrawInfo,
            };
        default:
            return initialState;
    }
}

export default withdrawReducer;
