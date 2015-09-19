const isBro = () => Boolean(window);

export function get() {
    if (!isBro()) {
        return null;
    }

    const raw = window.localStorage.getItem('activity');

    return raw
        ? JSON.parse(raw)
        : null;
}

export function put(store) {
    if (!isBro()) {
        return;
    }

    window.localStorage.setItm('activity', JSON.stringify(store));
}
