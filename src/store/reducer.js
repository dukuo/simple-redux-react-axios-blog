import actionTypes from './actions'

const initialState = {
    posts: [],
    readPost: null
}

const reducer = (state = initialState, action) => {    
    switch(action.type) {
        case actionTypes.GET_POST: 
            return state.posts.find(post => post.id === action.id)

        case actionTypes.GET_POSTS:
            return state.posts
            
        case actionTypes.SET_POSTS:
            let newposts = state.posts
            if(newposts.length > 0) {
                newposts.concat(action.posts)
            } else {
                newposts = action.posts
            }
            
            return {
                ...state,
                posts: newposts
            }
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts: state.posts.concat(action.post)
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        case actionTypes.EDIT_POST: 
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.post.id).concat(action.post)
            }
        case actionTypes.SET_READ_POST:
            return {
                ...state,
                readPost: action.id
            }
        case actionTypes.SET_EDIT_POST:
            return {
                ...state,
                editPost: action.id
            }
        default:
            return state;
    }
}


export default reducer