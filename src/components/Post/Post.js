import React from 'react';

import './Post.css';

const post = (props) => {
       return(
        <article className="Post" onClick={() => props.click(props.post)}>
            <sub>{props.post.id}</sub>
            <h1>{props.post.title}</h1>
            <div className="Info">
                <div className="Author">{props.post.author}</div>
            </div>
        </article>
    )
};


export default post;