export default (searchWord: string) => {
    if (searchWord) {
        document.title = `${searchWord} | Ověřujte.cz`;
    } else {
        document.title = 'Ověřujte.cz';
    }
}