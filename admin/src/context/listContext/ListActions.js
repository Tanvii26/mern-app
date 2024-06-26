//---GET---
export const getListsStart = () => ({
    type : "GET_LISTS_START",
});
export const getListsSuccess = (lists) => ({
    type : "GET_LISTS_SUCCESS", 
    payload: lists,
});
export const getListsFailure = () => ({
    type : "GET_LISTS_FAILURE",
});

//---DELETE---
export const deleteListsStart = () => ({
    type : "DELETE_LISTS_START",
});
export const deleteListsSuccess = (id) => ({
    type : "DELETE_LISTS_SUCCESS", 
    payload: id,
});
export const deleteListsFailure = () => ({
    type : "DELETE_LISTS_FAILURE",
});

//---CREATE---
export const createListsStart = () => ({
    type : "CREATE_LISTS_START",
});
export const createListsSuccess = (movie) => ({
    type : "CREATE_LISTS_SUCCESS", 
    payload: movie,
});
export const createListsFailure = () => ({
    type : "CREATE_LISTS_FAILURE",
});

//---UPDATE---
export const updateMovieStart = () => ({
    type : "UPDATE_MOVIE_START",
});
export const updateMovieSuccess = (movie) => ({
    type : "UPDATE_MOVIE_SUCCESS", 
    payload: movie,
});
export const updateMovieFailure = () => ({
    type : "UPDATE_MOVIE_FAILURE",
});
