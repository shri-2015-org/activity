import { comments, commits } from './github';
import _, { merge } from 'lodash';

const owner = 'shri-2015-org';
// const repo = 'activity';

function processComments(commitPromises) {
    return Promise.all(commitPromises)
        .then(receivedCommits => {
            const users = _(receivedCommits)
                .flatten()
                .pluck('author')
                .value()
                .reduce((users, commit) => {
                    const name = commit.login;
                    users[name] || (users[name] = {avatar: commit.avatar_url});
                    const user = users[name];
                    user.commits || (user.commits = 0);

                    user.commits++;
                    return users;
                }, {});

            return users;
        });
}

function processCommits(commitPromises) {
    return Promise.all(commitPromises)
        .then(receivedCommits => {
            const users = _(receivedCommits)
                .flatten()
                .pluck('author')
                .value()
                .reduce((users, commit) => {
                    const name = commit.login;
                    users[name] || (users[name] = {avatar: commit.avatar_url});
                    const user = users[name];
                    user.commits || (user.commits = 0);

                    user.commits++;
                    return users;
                }, {});

            return users;
        });
}

export function get(projects, mockComments, mockCommits) {
    const commentPromises = mockComments || projects.map(repo => comments(owner, repo));
    const commitPromises = mockCommits || projects.map(repo => commits(owner, repo));

    return Promise.all([
        processComments(commentPromises),
        processCommits(commitPromises)
    ])
    .then(([usersWithCommets, usersWithCommits]) => {
        const users = _(usersWithCommets)
            .merge(usersWithCommits)
            .forEach((desc, login) => {})
            .value();

        return users;
    });
}
