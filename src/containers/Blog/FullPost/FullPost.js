import React, { Component } from 'react';

import {withRouter, Link} from 'react-router-dom'

import {connect} from 'react-redux'
import actionTypes from '../../../store/actions'

import './FullPost.css';

class FullPost extends Component {

    state = {
        post: null,
        redirectToID: false
    }

    loadPost = (posts) => {
        console.log(posts)
        this.setState({
            post: {...posts.find(post => post.id.toString() === this.props.match.params.id)}
        })
    }
    
    componentDidMount() {
        if(!this.post) {
            this.loadPost(this.props.posts)
        }
    }

    componentWillReceiveProps(nextProps) {   
        this.loadPost(nextProps.posts)
    }

    onEditPostHandler = (id) => {
        this.props.setEditPost(id)
        this.props.history.push('/edit/' + id)
        
    }
    
    render () {
        let post = <p>Please select a Post!</p>;
        const loadedPost = this.state.post
        if(!!loadedPost) {
            post = (
                <div className="FullPost">
                    <Link to="/">Go Back</Link>

                    <p><button onClick={() => this.onEditPostHandler(loadedPost.id)}>Edit post</button></p>
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.content}</p>
                    <p>{loadedPost.body}</p>
                </div>
    
            );
        }
        return post;
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setEditPost: (id) => dispatch({type: actionTypes.SET_EDIT_POST, id}),
        getPost: (id) => dispatch({ type: actionTypes.GET_POST, id })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPost))