import { equal, ok } from 'assert';
import { get } from '../src/api';
import { forEach, result } from 'lodash';
import comments from './fixture/comments';
import commits from './fixture/commits';

describe('get()', () => {
    let response;

    before(done => {
        get(null, comments, commits)
            .then(result => {
                response = result;
                done();
            })
            .catch(done);
    });

    it('should return valid response', () => forEach(response, (desc, login) => {
        ok(login);
        ok(result(desc, 'avatar'), 'should have "avatar" property');
        ok(result(desc, 'commits'), 'should have "commits" property');
        equal(typeof result(desc, 'commits'), 'number');
        ok(result(desc, 'comments'), 'should have "comments" property');
        equal(typeof result(desc, 'comments'), 'number');
    }));
});
