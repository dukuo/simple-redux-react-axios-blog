import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'
import actionTypes from '../../../store/actions'

import axios from '../../../axios'

import '../NewPost/NewPost.css';

class EditPost extends Component {
    
    state = {
        post: null,
        redirectTo: false,
        toID: false
    }

    loadPost = (posts) => {
        console.log(posts)
        this.setState({
            post: {...posts.find(post => post.id.toString() === this.props.match.params.id)}
        })
    }
    
    componentDidMount() {
        if(!this.state.post) {
            this.loadPost(this.props.posts)
        }
    }

    componentWillReceiveProps(nextProps) {   
        this.loadPost(nextProps.posts)
    }


    onEditPostHandler = () => {
        const post = this.state.post
        axios.put("/posts/" + post.id).then(
            (res) => {
                this.props.postEdit(post)
                this.props.history.push('/posts/' + post.id)
            }
        )
    }

    onDeletePostHandler = () => {
        axios.delete('/posts/' + this.state.post.id)
        .then( res => {
            this.props.deletePost(this.state.post.id)
            this.props.history.push('/')
        })
    }

    render () {
        if( !!this.state.post) {

            return (
                <div className="NewPost">
                    <div className="Edit">
                        <button onClick={this.onDeletePostHandler} className="Delete">Delete</button>
                    </div>
                    <h1>Editing: {this.state.post.id}</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.post.title} onChange={(event) => this.setState({ post: {...this.state.post, title: event.target.value} })} />
                    <label>Content</label>
                    <textarea rows="4" value={this.state.post.body} onChange={(event) => this.setState({ post: {...this.state.post, body: event.target.value } })} />
                    <label>Author</label>
                    <select value={this.state.post.author} onChange={(event) => this.setState({ post: {...this.state.post, author: event.target.value } })}>
                        <option value="Max">Max</option>
                        <option value="Manu">Manu</option>
                    </select>
                    <button onClick={this.onEditPostHandler}>Edit Post</button>
                    <button onClick={() => this.props.history.push("/posts/" + this.state.post.id)}>Cancel</button>
                </div>
            );
        } 
        return (
            <p>Unable to find post.</p>
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
        postEdit: (post) => dispatch({type: actionTypes.EDIT_POST, post}),
        deletePost: (id) => dispatch({ type: actionTypes.DELETE_POST, id})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));