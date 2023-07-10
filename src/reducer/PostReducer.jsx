export function postReducer( state,{ type,payload }){
    switch(type){
        case "GET_POSTS":
            return{
                ...state,
                posts:payload,
            }

        case "CREATE_POST":
            return{
                ...state,
                posts:payload,
            }

        case "EDIT_POST":
            return{
                ...state,
                posts:payload,
            }

        case "DELETE_POST":
            return{
                ...state,
                posts:payload,
            }

        case "GET_POST_BY_ID":
            return{
                ...state,
                singlePost:payload,
            }

        case "GET_POST_BY_USERNAME":
            return{
                ...state,
                posts:payload,
            }

        case "LIKE_POST":
            return{
                ...state,
                posts:payload,
            }

        case "DISLIKE_POST":
            return{
                ...state,
                posts:payload,
            }

        case "SET_ALL_BOOKMARK_POST":
            return{
                ...state,
                bookmark:payload,
            }
        
        case "SORT":
            return{
                ...state,
                sort:payload,
            }
        
        default:
            return state;
    }
}