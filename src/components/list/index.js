import './index.styl';

import React from 'react';

export default props => {
    return (
        <table className='list'>
            <thead className='list__head'>
                <td className='list__login'>
                    Login
                </td>
                <td className='list__commits'>
                    Commits
                </td>
                <td className='list__comments'>
                    Comments
                </td>
            </thead>
            {
                Object.keys(props.data).map((key) => {
                    const item = props.data[key];
                    return (
                        <tr className='list__item'>
                            <td className='list__login'>
                                {item.login}
                            </td>
                            <td className='list__commits'>
                                {item.commits}
                            </td>
                            <td className='list__comments'>
                                {item.comments}
                            </td>
                        </tr>
                    );
                })
            }
        </table>
    );
};
