import { comments, commits } from './github';
import _, { merge } from 'lodash';
import * as storage from './storage';

const owner = 'shri-2015-org';
// const repo = 'activity';

function processComments(commentPromises) {
    return Promise.all(commentPromises)
        .then(receivedComments => {
            let usersList = _(receivedComments)
                .flatten()
                .pluck('user')
                .value();
            const length = usersList.length;
            const users = usersList.reduce((users, comment) => {
                    if (comment === undefined) {
                      return null;
                    }
                    const name = comment.login;
                    users[name] || (users[name] = {avatar: comment.avatar_url});
                    const user = users[name];
                    user.comments || (user.comments = 0);

                    user.comments++;
                    return users;
                }, {});

            return {comments: length, users};
        });
}

function processCommits(commitPromises) {
    return Promise.all(commitPromises)
        .then(receivedCommits => {
            let usersList = _(receivedCommits)
                .flatten()
                .reject((commit) => {
                  return commit.author === null;
                })
                .pluck('author')
                .value();
            const length = usersList.length;
            const users = usersList.reduce((users, commit) => {
                    const name = commit.login;
                    users[name] || (users[name] = {avatar: commit.avatar_url});
                    const user = users[name];
                    user.commits || (user.commits = 0);

                    user.commits++;
                    return users;
                }, {});

            return {commits: length, users};
        });
}

export function get(projects, mockComments, mockCommits) {
    const stored = storage.get();

    if (stored) {
        return Promise.resolve(stored);
    }

    const commentPromises = mockComments || projects.map(repo => comments(owner, repo));
    const commitPromises = mockCommits || projects.map(repo => commits(owner, repo));

    return Promise.all([
        processComments(commentPromises),
        processCommits(commitPromises)
    ])
    .then(([usersWithComments, usersWithCommits]) => {
        const data = _.merge(usersWithComments, usersWithCommits);
        _.forEach(data.users, (desc, login) => {
            desc.comments = desc.comments && data.comments
                ? desc.comments / data.comments
                : 0;

            desc.commits = desc.commits && desc.commits
                ? desc.commits / data.commits
                : 0;
        });

        storage.put(data.users);
        return data.users;
    });
}
