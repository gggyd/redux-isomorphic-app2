import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render() {
    return (
      <div>
        {
          this.props.posts.map((item, index) => {
            <blockquote key={i}>{post.title}</blockquote>
          })
        }
      </div>
    );
  }
}

Posts.propsTypes = {
  posts: PropTypes.array.isRequired
}