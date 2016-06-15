import React, {Component} from 'react';
import ProfileMenu from '../profile/ProfileMenu.jsx';


export default class Header extends Component {

	toggleSidebar(e){
		e.preventDefault();
		$('body').toggleClass("sidebar-collapse sidebar-open");
	}

	render(){
		return(
			<header className="main-header">
				
				<a href="index2.html" className="logo">
					<span className="logo-mini"><b>A</b>LT</span>
					<span className="logo-lg"><b>Admin</b>LTE</span>
				</a>
				
				<nav className="navbar navbar-static-top" role="navigation">
					<a 	onClick={this.toggleSidebar.bind(this)}
						className="sidebar-toggle" 
						data-toggle="offcanvas" 
						role="button">
						<span className="sr-only">Toggle navigation</span>
					</a>
					<div className="navbar-custom-menu">
						<ul className="nav navbar-nav">
							<ProfileMenu />
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}