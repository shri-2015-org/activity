import { comments, commits } from './github';
import { spread } from 'lodash';

const owner = 'shri-2015-org';
const repo = 'activity';

export function get() {
    Promise.all([comments(owner, repo), commits(owner, repo)])
        .then(([receivedComments, receivedCommits]) => {
            console.log(receivedComments);
            console.log(receivedCommits);
        });
}
