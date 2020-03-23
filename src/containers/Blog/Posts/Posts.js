import React, { Component } from 'react'

import {withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import actionTypes from '../../../store/actions'
import Post from '../../../components/Post/Post'

import './Posts.css'

class Posts extends Component {
    
    constructor( props ) {
        super(props)
        this.onReadPostHandler = this.onReadPostHandler.bind(this)
    }

    state = {
        post: null,
        editPost: null,
        redirectToID: false
    }
    
    onReadPostHandler = (id) => {
        this.props.setReadPost(id)
        this.props.history.push('/posts/' + id)
    }

    render () {
        const posts = this.props.posts.map( post => (
            <Post click={this.onReadPostHandler} key={post.id} post={post} />
        ))
        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPosts: () => dispatch({ type: actionTypes.GET_POSTS }),
        setPosts: (posts) => dispatch({ type: actionTypes.SET_POSTS, posts}),
        addPost: (post) => dispatch({ type: actionTypes.ADD_POST, post}),
        deletePost: (id) => dispatch({ type: actionTypes.DELETE_POST, id }),
        editPost: (post) => dispatch({ type: actionTypes.EDIT_POST, post }),
        setReadPost: (id) => dispatch({ type: actionTypes.SET_READ_POST, id })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))