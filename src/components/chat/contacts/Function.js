function removeAccents(str) {
    let tmp = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return tmp;
}

function filterList(list, filter) {
    let tmp = [];
    filter = filter.toLowerCase();
    list.forEach(item => {
        if (removeAccents(item.name).toLowerCase().includes(removeAccents(filter))) {
            tmp.push(item);
        }
    });
    return tmp;
}

export { removeAccents,filterList };