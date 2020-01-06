import {
    URL,
    MAX_SUGGESTION_LIST_SIZE,
    SORT_TYPE,
} from 'config';

const initialState = {
    data: null,
    users: null,
    page: null,
    currentPageNumber: 0,
    itemsPerPage: 10,
    filtersCount: 0,
    toggleReset: false,
    suggestions: null,
};

/**
 * Getting the data and then store it as data and users fields
 * The users field needs to generate pages and show a search result
 * The data field we need only to avoid extra data fetch (after a search filter was cleared)
 */
export function fetchUsers() {
    return function (dispatch, getState) {
        fetch(URL)
            .then(response => {
                return response.json();
            })
            .then(users => {
                // store the data
                dispatch(setData(users));
                dispatch(setUsers(users));
                const state = getState();

                // create a first page and a pages count
                const page = users.slice(0, state.app.itemsPerPage);
                dispatch(setPagesCount(Math.ceil(users.length / state.app.itemsPerPage)));
                dispatch(setPage(page));
            });
    }
}

/**
 * Reset search filter
 */
export function reset() {
    return function (dispatch, getState) {
        const state = getState();
        const users = state.app.data; // restore initial data from the stored field
        const page = users.slice(0, state.app.itemsPerPage);
        dispatch(setCurrentPage(0));
        dispatch(setUsers(users));
        dispatch(toggleReset(false));
        dispatch(setPagesCount(Math.ceil(users.length / state.app.itemsPerPage)));
        dispatch(setPage(page));
    }
}

/**
 * Suggestion form
 * Generation suggestion items by comparison the value with both the first and the second name
 * @param {string} value
 */
export function search(value) {
    return function(dispatch, getState) {
        const state = getState();
        if (value.length) {
            const suggestions = state.app.data.filter(user => {
                const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                return fullName.includes(value.toLowerCase());
            }).slice(0, MAX_SUGGESTION_LIST_SIZE);
            if (suggestions.length) {
                dispatch(setSuggestions(suggestions));
            } else {
                dispatch(setSuggestions(null));
            }
        } else {
            dispatch(setSuggestions(null));
        }
    }
}

/**
 * Update the pages with the search filter value.
 * The users field is changing here and will be restored from the data field after clear this filter
 * @param {string} value
 */
export function filter(value) {
    return function(dispatch, getState) {
        const state = getState();
        dispatch(setCurrentPage(0));
        const users = state.app.data.filter(user => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            return fullName.includes(value.toLowerCase());
        });
        dispatch(setUsers(users));
        dispatch(setSuggestions(null));
        dispatch(setPagesCount(Math.ceil(users.length / state.app.itemsPerPage)));
        const page = users.slice(0, state.app.itemsPerPage);
        dispatch(setPage(page));
        dispatch(toggleReset(true));
    }
}

/**
 * Sorting functions
 * @param {(SORT_TYPE.ASC|SORT_TYPE.DES)} direction - sorting direction
 */
export function sortByDob(direction) { // by DOB
    return function(dispatch, getState) {
        const state = getState();
        function getTime(str) {
            return Date.parse(str.split('/').reverse().join('/'));
        }

        // sort the whole users field
        const users = state.app.users.sort((a, b) => {
            if (direction === SORT_TYPE.ASC) {
                return getTime(a.date_of_birth) - getTime(b.date_of_birth);
            }
            return getTime(b.date_of_birth) - getTime(a.date_of_birth);
        });
        dispatch(setUsers(users)); // update the users field
        dispatch(setCurrentPage(0)); // always starting from the first page
        const page = state.app.users.slice(0, state.app.itemsPerPage); // getting a first page
        dispatch(setPage(page)); // set the page
    }
}
export function sortByIndustry(direction) { // by industry
    return function(dispatch, getState) {
        const state = getState();
        const users = state.app.users.sort((a, b) => {
            if (direction === SORT_TYPE.ASC) {
                return ('' + a.industry).localeCompare(b.industry);
            }
            return ('' + b.industry).localeCompare(a.industry);
        });
        dispatch(setUsers(users));
        dispatch(setCurrentPage(0)); // always starting from the first page
        const page = state.app.users.slice(0, state.app.itemsPerPage);
        dispatch(setPage(page));
    }
}
export function sortBySalary(direction) { // by salary
    return function(dispatch, getState) {
        const state = getState();
        const users = state.app.users.sort((a, b) => {
            if (direction === SORT_TYPE.ASC) {
                return a.salary - b.salary;
            }
            return b.salary - a.salary;
        });
        dispatch(setUsers(users));
        dispatch(setCurrentPage(0)); // always starting from the first page
        const page = state.app.users.slice(0, state.app.itemsPerPage);
        dispatch(setPage(page));
    }
}

/**
 * Update amount of items per page
 * @param {number} pageSize
 */
export function updatePageSize(pageSize) {
    return function (dispatch, getState) {
        const state = getState();
        dispatch(setItemsPerPage(pageSize));
        dispatch(setCurrentPage(0)); // always starting from the first page
        dispatch(setPagesCount(Math.ceil(state.app.users.length / pageSize)));
        const page = state.app.users.slice(0, pageSize);
        dispatch(setPage(page));
    }
}

/**
 * Go to the next/prev page
 * @param {string} dir
 */
export function updatePageNumber(dir) {
    return function (dispatch, getState) {
        const state = getState();
        let currentPage = state.app.currentPageNumber;
        switch (dir) {
            case 'next':
                currentPage++;
                break;
            case 'prev':
                currentPage--;
                break;
        }
        dispatch(setCurrentPage(currentPage));
        const nextPageStart = currentPage * state.app.itemsPerPage;
        const nextPageEnd = nextPageStart + state.app.itemsPerPage;
        const page = state.app.users.slice(nextPageStart, nextPageEnd);
        dispatch(setPage(page));
    }
}

export const SET_USERS = Symbol('SET_USERS');
export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}
export const SET_DATA = Symbol('SET_DATA');
export function setData(data) {
    return {
        type: SET_DATA,
        data,
    }
}
export const SET_CURRENT_PAGE = Symbol('SET_CURRENT_PAGE');
export function setCurrentPage(currentPageNumber) {
    return {
        type: SET_CURRENT_PAGE,
        currentPageNumber
    }
}
export const SET_ITEMS_PER_PAGE = Symbol('SET_ITEMS_PER_PAGE');
export function setItemsPerPage(itemsPerPage) {
    return {
        type: SET_ITEMS_PER_PAGE,
        itemsPerPage
    }
}
export const SET_PAGE = Symbol('SET_PAGE');
export function setPage(page) {
    return {
        type: SET_PAGE,
        page
    }
}
export const SET_PAGES_COUNT = Symbol('SET_PAGES_COUNT');
export function setPagesCount(pagesCount) {
    return {
        type: SET_PAGES_COUNT,
        pagesCount
    }
}
export const SET_SUGGESTIONS = Symbol('SET_SUGGESTIONS');
export function setSuggestions(suggestions) {
    return {
        type: SET_SUGGESTIONS,
        suggestions
    }
}
export const TOGGLE_RESET = Symbol('TOGGLE_RESET');
export function toggleReset(toggleReset) {
    return {
        type: TOGGLE_RESET,
        toggleReset
    }
}

// just a reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            return Object.assign({}, state, {
                users: action.users,
            });
        case SET_CURRENT_PAGE:
            return Object.assign({}, state, {
                currentPageNumber: action.currentPageNumber,
            });
        case SET_ITEMS_PER_PAGE:
            return Object.assign({}, state, {
                itemsPerPage: action.itemsPerPage,
            });
        case SET_PAGE:
            return Object.assign({}, state, {
                page: action.page,
            });
        case SET_PAGES_COUNT:
            return Object.assign({}, state, {
                pagesCount: action.pagesCount,
            });
        case SET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.suggestions,
            });
        case TOGGLE_RESET:
            return Object.assign({}, state, {
                toggleReset: action.toggleReset,
            });
        case SET_DATA:
            return Object.assign({}, state, {
                data: action.data,
            });
        default:
            return state;
    }
}