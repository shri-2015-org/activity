export const SHOW = 'SHOW';

export function show(data) {
    return {
        type: SHOW,
        data: data
    };
}
