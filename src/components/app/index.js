import './index.styl';

import {connect} from 'react-redux';
import React from 'react';
import Header from '../header';

export default props => {
    return (
        <div className='application'>
            <Header>Students activity visualization.</Header>
        </div>
    );
};
