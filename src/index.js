import reducer from './reducer';
import {createStore} from 'redux';
import React, {render} from 'react';

import {get} from './api';
import {show} from './actions';
import Container from './components/container';

const store = createStore(reducer);

get(['activity']).then((response) => {
    const action = show(response);
    store.dispatch(action);
});

render(<Container store={store} />, document.body);
