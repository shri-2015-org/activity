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
        ok(desc.commits !== undefined, 'should have "commits" property');
        equal(typeof desc.commits, 'number');
        ok(desc.comments !== undefined, 'should have "comments" property');
        equal(typeof desc.comments, 'number');
    }));
});
