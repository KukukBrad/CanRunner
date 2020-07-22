import {UPLOAD_USER, uploadUser} from "../actions/createUser";
import {connect} from 'react-redux';

const initialState = {
    User: {}
}

const createUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPLOAD_USER: 
            uploadUser(state);

        default: 
            return state;
    }
}

export default createUserReducer;