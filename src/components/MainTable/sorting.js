// THERE IS A SORTING LOGIC!

const sortByNameAsc = (a, b) => {
    if (a.name > b.name) {
        return 1
    } else {
        return -1
    }
}
const sortByNameDesc = (a, b) => {
    if (a.name > b.name) {
        return -1
    } else {
        return 1
    }
}
const sortByAbvAsc = (a, b) => {
    if (a.abv > b.abv) {
        return 1
    } else {
        return -1
    }
}
const sortByAbvDesc = (a, b) => {
    if (a.abv < b.abv) {
        return 1
    } else {
        return -1
    }
}
const sortOptions = {
    'ByNameAsc': sortByNameAsc,
    'ByNameDesc': sortByNameDesc,
    'ByAbvAsc' : sortByAbvAsc,
    'ByAbvDesc': sortByAbvDesc
}

export const sorting = sortBy => {
    return sortOptions[sortBy]
}