export const setFilter =  (filterInput) => {
    return {
        type: 'SET_FILTER',
        filterInput
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filterInput
        default: 
        return state
    }
}

export default reducer