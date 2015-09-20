import './index.styl';

import {connect} from 'react-redux';
import React from 'react';
import Header from '../header';
import List from '../list';

const ListConnected = connect(state => ({data: state.data}))(List);

export default props => {
    return (
        <div className='application'>
            <Header>Students activity visualization</Header>
            <ListConnected />
        </div>
    );
};
