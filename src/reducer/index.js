import { SHOW } from '../actions';
import {assign} from 'lodash';

const initialState = {
    data: {}
};

export default function reducer(state = initialState, action) {
    if (action.type === SHOW) {
        state.data = assign({}, action.data);
    }
    return state;
}
