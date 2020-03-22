import React, { Component } from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import actionTypes from '../../store/actions'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import EditPost from '../../components/EditPost/EditPost';

import './Blog.css';

class Blog extends Component {
    state = {
        post: null,
        editPost: null
    }

    constructor( props ) {
        super(props)
        this.onFullPostHandler = this.onFullPostHandler.bind(this)
        this.setEditPost = this.setEditPost.bind(this)
    }
    
    onFullPostHandler = (post) => {
        this.setState({ post: post })
    }
    

    onPostAddition = (data) => {
        axios.post("https://jsonplaceholder.typicode.com/posts", data ).then(
            (res) => this.props.addPost(res.data)
        )
    }

    onPostDeletion = (id) => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + id).then(
            (res) => {
                // wipe local state
                this.setState({ post: null })
                // dispatch to redux reducer
                this.props.deletePost(id)
            }
        )

    }

    onPostEdit = (post) => {
        axios.put("https://jsonplaceholder.typicode.com/posts/" + post.id).then(
            (res) => {
                this.props.editPost(post)
                this.setState({
                    editPost: null,
                    post: post
                })
            }
        )
    }

    onCancelEdit = () => {
        this.setState({
            editPost : null
        })
    }

    setEditPost = (id) => {
        const post = this.props.posts.find( p => p.id === id)
        console.log("Setting editPost ", post)
        this.setState( {
            editPost: post
        })
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
                    <FullPost post={this.state.post} click={this.onPostDeletion} edit={this.setEditPost} />
                </section>
                <section>
                    <EditPost post={this.state.editPost} click={this.onPostEdit} cancel={this.onCancelEdit} />
                </section>
                <section>
                    <NewPost post={this.state.post} click={this.onPostAddition} />
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