import React, { Component } from 'react';

import {connect} from 'react-redux'

import {withRouter, Redirect } from 'react-router-dom'

import axios from '../../../axios'
import actionTypes from '../../../store/actions'

import './NewPost.css';

class NewPost extends Component {
    state = {
        post: {
            title: '',
            userId: 1,
            author: 'Max'
        },
        redirect: false
    }

    onPostAddition = (data) => {
        axios.post("/posts", data )
        .then(
            (res) => {
                this.props.addPost(res.data)
                this.setState({redirect: true})

            }
        )
        .catch(e => console.log(e))
    }

    addAndResetState = () => {
        // this.setState({
        //     title: '',
        //     body: '',
        //     userId: 1,
        //     author: 'Max'
        // })
        this.onPostAddition(this.state.post)

        console.log("ADDING POST")
    }

    render () {
        if( this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.post.title} onChange={(event) => this.setState({ post : { ...this.state.post, title: event.target.value }})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.post.body} onChange={(event) => this.setState({post : { ...this.state.post, body: event.target.value }})} />
                <label>Author</label>
                <select value={this.state.post.author} onChange={(event) => this.setState({ post : { ...this.state.post, author: event.target.value }})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.addAndResetState}>Add Post</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))