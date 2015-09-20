export const SHOW = 'SHOW';

export function show(data) {
    return {
        type: SHOW,
        data: Object.keys(data).map((login) => {
            data[login].login = login;
            return data[login];
        })
    };
}
