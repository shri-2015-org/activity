import reducer from './reducer';
import {createStore} from 'redux';
import React, {render} from 'react';

import {get} from './api';
import show from './actions';
import Container from './components/container';

const store = createStore(reducer);

get().then(([receivedComments, receivedCommits]) => {
    const action = show([receivedComments, receivedCommits]);
    store.dispatch(action);
});

render(<Container store={store} />, document.body);
