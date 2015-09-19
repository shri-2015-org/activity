import './index.styl';

import React from 'react';

export default props => {
    let a = props.data ? <pre>{JSON.stringify(props.data)}</pre> : '';
    return (a);
};
