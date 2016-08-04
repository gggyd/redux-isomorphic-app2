import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Header extends Component {
	
  render() {
		const {version} = this.props;

    return (
			<div className="masthead">
				<div className="container">
					<h3 className="masthead-title">
						<a href="/" title="Home">同构应用</a>
					</h3>
					<nav className="sidebar-nav">
						<Link to="/home" className="sidebar-nav-item" activeClassName="active">Home <span className="nav-note">[static]</span></Link>
						<Link to="/news" className="sidebar-nav-item" activeClassName="active">News <span className="nav-note">[api]</span></Link>
						<Link to="/about" className="sidebar-nav-item" activeClassName="active">About <span className="nav-note">[static]</span></Link>
						<span className="sidebar-nav-item"><span className="nav-note version">{`Currently version ${version}`}</span></span>
					</nav>
				</div>
			</div>
    );
  }
}

export default Header;