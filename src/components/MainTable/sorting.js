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

// SWITCH CASE JUST CAUSE DUNNO HOW TO GET DYNAMIC FUNC NAMES.
export const sorting = sortBy => {
    switch(sortBy) {
        case 'ByNameAsc':
            return sortByNameAsc
        case 'ByNameDesc':
            return sortByNameDesc
        case 'ByAbvAsc':
            return sortByAbvAsc
        case 'ByAbvDesc':
            return sortByAbvDesc
        default: return sortByNameAsc
    }
}