// A reducer function that manages state changes related to authentication.
const AuthReducer = (state, action) => {
    switch(action.type){ // based on action we know what path to take from here i.e. reduce the step (choose a path)
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching:false,
                error:false,
            };
        case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching:false,
                error:true,
            };
        case "LOGOUT":
            return{
                user:null,
                isFetching:false,
                error:false,
            }
        default: 
            return {...state};
    }
};

export default AuthReducer;