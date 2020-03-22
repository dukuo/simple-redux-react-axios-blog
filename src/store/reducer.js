import actionTypes from './actions'

const initialState = {
    posts: []
}

const reducer = (state = initialState, action) => {    
    switch(action.type) {
        case actionTypes.GET_POSTS:
            return state.posts
        case actionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case actionTypes.ADD_POST:
            console.log(action)
            return {
                ...state,
                posts: state.posts.concat(action.post)
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.id)
            }
        case actionTypes.EDIT_POST: 
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.post.id).concat(action.post)
            }
        default:
            return state;
    }
}


export default reducer