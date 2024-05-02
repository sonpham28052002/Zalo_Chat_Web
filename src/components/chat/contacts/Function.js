function removeAccents(str) {
    let tmp = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return tmp;
}

function filterList(list, filter, sort) {
    let tmp = [];
    filter = filter.toLowerCase();
    list.forEach(item => {
        if (removeAccents(item.user.userName).toLowerCase().includes(removeAccents(filter))) {
            tmp.push(item);
        }
    });
    if (sort === "ins")
        return tmp.sort((a, b) => a.user.userName.localeCompare(b.user.userName))
    return tmp.sort((b, a) => a.user.userName.localeCompare(b.user.userName))
}

export { removeAccents, filterList };