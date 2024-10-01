import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './action';

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const authUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, token: action.payload, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT :
            return { ...state, token: null, error: null }; // Reset the token and error on logout
        default:
            return state;
    }
};


export default authUserReducer;
