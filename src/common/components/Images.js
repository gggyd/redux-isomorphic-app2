import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Posts from './images/Posts';

class Images extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostsIfNeeded();
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.props.invalidateImages();
    this.props.fetchPostsIfNeeded();
  }

  render() {
    const { posts, isFetching, lastUpdated, error } = this.props;
    return (
      <div>
        <p className="post-tag">
          {lastUpdated && 
            <span>
              last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
               Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h3>Loading...</h3>
        }
        {!isFetching && error && posts.length === 0 &&
          <h3 className="post-error">There has been an Error</h3>
        }
        {!isFetching && !error && posts.length === 0 &&
          <h3>Empty</h3>
        }
        {posts.length > 0 &&
          <div>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}

Images.propTypes = {
  posts: PropTypes.array.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
}

export default Images;

