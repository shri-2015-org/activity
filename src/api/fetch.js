export default function fetch(url) {
    return window.fetch(url)
        .then(response => response.json());
}
