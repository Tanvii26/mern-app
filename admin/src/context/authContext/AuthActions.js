// 3 actions             ->Success
              //        |
              // Start -
              //        |
              //         -> Failure

export const loginStart = () => ({
    type : "LOGIN_START",
});
export const loginSuccess = (user) => ({
    type : "LOGIN_SUCCESS",
    payload: user, // on successful login we get user from api return this user in the payload 
});
export const loginFailure = () => ({
    type : "LOGIN_FAILURE",
});

// -----LOGOUT----
export const logout = () => ({
    type: "LOGOUT",
});
