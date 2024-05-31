// A reducer function that manages state changes related to authentication.
const ListReducer = (state, action) => {
    switch(action.type){ // based on action we know what path to take from here i.e. reduce the step (choose a path)
        case "GET_LISTS_START":
            return{
                lists:[],
                isFetching:true,
                error:false,
            };
        case "GET_LISTS_SUCCESS":
            return{
                lists: action.payload,
                isFetching:false,
                error:false,
            };
        case "GET_LISTS_FAILURE":
            return{
                lists:[],
                isFetching:false,
                error:true,
            };
        case "DELETE_LISTS_START":
            return{
                ...state,
                isFetching:true,
                error:false,
            };
        case "DELETE_LISTS_SUCCESS":
            return{
                lists: state.lists.filter((movie)=> movie._id !== action.payload),
                isFetching:false,
                error:false,
            };
        case "DELETE_LISTS_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true,
            };
        case "UPDATE_LISTS_START":
            return{
                ...state,
                isFetching:true,
                error:false,
            };
        case "UPDATE_LISTS_SUCCESS":
            return{
                lists: state.lists.map((list)=> list._id === action.payload._id && action.payload),
                isFetching:false,
                error:false,
            };
        case "UPDATE_LISTS_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true,
            };
        case "CREATE_LISTS_START":
            return{
                ...state,
                isFetching:true,
                error:false,
            };
        case "CREATE_LISTS_SUCCESS":
            return{
                lists: [...state.lists, action.payload],
                isFetching:false,
                error:false,
            };
        case "CREATE_LISTS_FAILURE":
            return{
                ...state,
                isFetching:false,
                error:true,
            };
        default: 
            return {...state};
    }
};

export default ListReducer;