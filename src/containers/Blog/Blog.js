import React, { Component } from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import actionTypes from '../../store/actions'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        post: null
    }

    constructor( props ) {
        super(props)
        this.onFullPostHandler = this.onFullPostHandler.bind(this)
    }
    
    onFullPostHandler = (post) => {
        this.setState({ post: post })
    }

    onPostDeletion = (id) => {
        // wipe local state
        this.setState({ post: null })

        // dispatch to redux reducer
        this.props.deletePost(id)
    }
    
    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10").then((res) => {
            this.props.setPosts(res.data)
        })
    }
    
    render () {
        const posts = this.props.posts.map( post => (
            <Post click={this.onFullPostHandler} key={post.id} post={post} />
        ))
        // const posts = null
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost post={this.state.post} click={this.onPostDeletion} />
                </section>
                <section>
                    <NewPost click={this.props.addPost} />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPosts: () => dispatch({ type: actionTypes.GET_POSTS }),
        setPosts: (posts) => dispatch({ type: actionTypes.SET_POSTS, posts}),
        addPost: (post) => dispatch({ type: actionTypes.ADD_POST, post}),
        deletePost: (id) => dispatch({ type: actionTypes.DELETE_POST, id }),
        editPost: (post) => dispatch({ type: actionTypes.EDIT_POST, post })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);