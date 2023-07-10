export function userReducer( state,{ type,payload }){
    switch(type){

        case "GET_USERS":
            return{
                ...state,
                users:payload,
            }

        case "UPDATE_USER":
            return{
                ...state,
                users:state?.users.map(user=> user._id === payload._id ? payload : user)
            }
            case "EDIT_USER":
                return {
                  ...state,
                  users: state?.users?.map((user) =>
                    payload?._id === user._id ? { ...payload } : user
                  ),
                };
        default:
            return state;
    }
}