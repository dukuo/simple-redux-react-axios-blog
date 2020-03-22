import React, { Component } from 'react';

import '../NewPost/NewPost.css';

class EditPost extends Component {
    
    state = {
        post: null
    }

    componentWillReceiveProps(nextProps, prevState) {
        this.setState({
            ...nextProps.post
        })
    }

    render () {
        if( !!this.props.post) {

            return (
                <div className="NewPost">
                    <h1>Editing: {this.props.post.id}</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    <label>Content</label>
                    <textarea rows="4" value={this.state.body} onChange={(event) => this.setState({body: event.target.value})} />
                    <label>Author</label>
                    <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                        <option value="Max">Max</option>
                        <option value="Manu">Manu</option>
                    </select>
                    <button onClick={() => this.props.click(this.state)}>Edit Post</button>
                    <button onClick={this.props.cancel}>Cancel</button>
                </div>
            );
        } else {
            return null
        }
    }
}

export default EditPost;