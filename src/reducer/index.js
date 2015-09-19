import { SHOW } from '../actions';

export default function reducer(state, action) {
    if (action.type === SHOW) {
        state = action.data;
    }
    return state;
}
