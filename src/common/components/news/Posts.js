import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render () {
    return (
      <div>
        {this.props.posts.map((post, i) => 
          <blockquote key={i}>{post.title} </blockquote>
        )}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};