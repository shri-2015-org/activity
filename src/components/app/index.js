import './index.styl';

import {connect} from 'react-redux';
import React from 'react';
import Header from '../header';
import Table from '../table';

const TableConnected = connect(state => ({data: state.data}))(Table);

export default props => {
    return (
        <div className='application'>
            <Header>Students activity visualization.</Header>
            <TableConnected />
        </div>
    );
};
