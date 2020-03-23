import React, { Component } from 'react';

import { connect } from 'react-redux';
import actionTypes from '../../store/actions'

import { withRouter, Route, NavLink } from 'react-router-dom'

import Posts from './Posts/Posts'

import './Blog.css';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import EditPost from './EditPost/EditPost'

import axios from '../../axios'


class Blog extends Component {
    
    componentDidMount() {
        axios.get("/posts?_limit=10").then((res) => {
            this.props.setPosts(res.data)
        })
        .catch(e => console.log(e))
    }
    
    render () {

        // const posts = null
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to={"/"} exact>Home</NavLink></li>
                            <li><NavLink to={"/new-post"} exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Route path="/" exact render={() => <Posts />} />
                <Route path="/new-post" exact render={() => <NewPost />} />
                <Route path="/posts/:id" render={() => <FullPost />} />
                <Route path="/edit/:id" render={() => <EditPost /> } />
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPosts: (posts) => dispatch({ type: actionTypes.SET_POSTS, posts})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))