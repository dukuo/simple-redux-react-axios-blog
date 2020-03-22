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
            const tmpPost = { ...action.post }

            const lastID = state.posts.reduce((acc, curr) => acc < curr.id ? curr.id : acc, 0)
            tmpPost.userId = new Buffer(action.post.author).toString('base64')
            tmpPost.id = lastID + 1

            return {
                ...state,
                posts: state.posts.concat(tmpPost)
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