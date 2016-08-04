import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Picker from './news/Picker';
import Posts from './news/Posts';

class News extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { selectedNews } = this.props;
    this.props.fetchNewsIfNeeded(selectedNews);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedNews !== this.props.selectedNews) {
      const { selectedNews } = nextProps;
      this.props.fetchNewsIfNeeded(selectedNews);
    }
  }

  handleChange(nextNews) {
    this.props.selectNews(nextNews);
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { selectedNews } = this.props;
    this.props.invalidateNews(selectedNews);
    this.props.fetchNewsIfNeeded(selectedNews);
  }

  render () {
    const { selectedNews, posts, isFetching, lastUpdated, error } = this.props;
    return (
      <div>
        <p className="post-tag">
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
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
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
}

News.propTypes = {
  selectedNews: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
};

export default News;