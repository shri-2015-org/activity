import { comments, commits } from './github';
import _, { merge } from 'lodash';
import storage from 'storage';

const owner = 'shri-2015-org';
// const repo = 'activity';

function processComments(commentPromises) {
    return Promise.all(commentPromises)
        .then(receivedComments => {
            const users = _(receivedComments)
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

            return {comments: receivedComments.length, users};
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

            return {commits: receivedCommits.length, users};
        });
}

export function get(projects, mockComments, mockCommits) {
    const stored = storage.get();

    if (stored) {
        return stored;
    }

    const commentPromises = mockComments || projects.map(repo => comments(owner, repo));
    const commitPromises = mockCommits || projects.map(repo => commits(owner, repo));

    return Promise.all([
        processComments(commentPromises),
        processCommits(commitPromises)
    ])
    .then(([usersWithCommets, usersWithCommits]) => {
        const data = _.merge(usersWithCommets, usersWithCommits);
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
